require('dotenv').config()
const express = require('express')
const multer = require('multer')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const flash = require('express-flash')

const { Connection } = require('./connection')
const { ObjectId } = require('mongodb')
const helper = require('./helper')

const app = express()
const PORT = process.env.PORT || 3030

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(serveStatic('public'))
app.use('/insert', express.static('uploads'));
app.set('view engine', 'ejs')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imgs')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filetype = file.originalname.split('.').pop();
    cb(null, `${uniqueSuffix}.${filetype}`)
  }
})
var upload = multer({ storage: storage })

const mongoUri = process.env.MONGO_URI

app.use(cookieSession({
  name: 'session',
  keys: [helper.randomString(20)],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(flash())

// ================================================================================================

const DB = 'oliviarchive'
const RECIPES = 'recipes'
const COUNTERS = 'counters'

app.get('/', async (req, res) => {
  const db = await Connection.open(mongoUri, DB)
  const foundRecipes = await db.collection(RECIPES).find().toArray()
  return res.render('index.ejs', { recipes: foundRecipes })
})

app.get('/recipe/:rid', async (req, res) => {
  const rid = parseInt(req.params.rid)
  const recipe = await lookupRecipe(rid)
  if (!recipe) {
    req.flash('error', `No such recipe: ${req.params.rid}`)
    return res.redirect('/')
  }
  return res.render('recipe.ejs', { recipe })
})

app.get('/insert', (req, res) => {
  const recipeData = { title: '', servings: '', time: '', ingredients: [], directions: [], imagePath: "" }
  return res.render('insert.ejs', { recipe: recipeData })
})

const checkInputs = (recipeData) => {
  const errors = []
  if (recipeData.title.length === 0) {
    errors.push('Missing Input: Please specify a title.')
  }
  if (recipeData.servings.length === 0) {
    errors.push('Missing Input: Please specify the amount of servings made.')
  }
  const sInt = parseInt(recipeData.servings)
  if (isNaN(sInt) || sInt.toString() !== recipeData.servings) {
    errors.push(`(${recipeData.servings}) (servings amount) is not an integer`)
  }
  if (recipeData.time.length === 0) {
    errors.push('Missing Input: Please specify how long (in minutes) this recipe takes to make.')
  }
  const tInt = parseInt(recipeData.time)
  if (isNaN(tInt) || tInt.toString() !== recipeData.time) {
    errors.push(`(${recipeData.time}) (time amount) is not an integer`)
  }
  if (recipeData.ingredients.length === 0) {
    errors.push('Missing Input: Please specify at least 3 ingredients.')
  }
  if (recipeData.directions.length === 0) {
    errors.push('Missing Input: Please specify at least 1 direction step.')
  }
  return errors
}

app.post('/insert', upload.single('photo'), async (req, res) => {
  try {
    const recipeData = req.body
    const errors = checkInputs(recipeData)
    if (errors.length > 0) {
      // re-render the page, displaying any form entry errors we found earlier
      errors.forEach((err) => req.flash('info', err))
      return res.render('insert.ejs', { recipe: recipeData })
    }
    var fPath = (req.file.path).replace("public\\imgs\\", "")
    recipeData.imagePath = fPath
    console.log(recipeData)
    const db = await Connection.open(mongoUri, DB)
    const rid = await db.collection(COUNTERS).findOneAndUpdate(
      { _id: new ObjectId('64532e4de8ba3356173af515') },
      { $inc: { seq: 1 } },
      { returnOriginal: false, upsert: true }
    )
    recipeData.id = rid.value.seq
    const result = await db.collection(RECIPES).insertOne(recipeData)
    if (result.matchedCount === 1 && result.upsertedCount === 0) {
      req.flash('error', `Error: id ${recipeData.id} in use`)
      return res.render('insert.ejs', { recipeData })
    }
    return res.redirect('/update/' + recipeData.id)
  } catch (err) {
    req.flash('error', `Error inserting recipe: ${JSON.stringify(err)}.`)
    return res.redirect('/')
  }
})

app.post('/search', async (req, res) => {
  const query = new RegExp(req.body.query, 'i')
  // use a regex expression to ignore case and look for partial matches
  const db = await Connection.open(mongoUri, DB)
  try {
    const found = await db.collection(RECIPES).find({ title: { $regex: query } }).toArray();
    return res.json(found); // Sending the search results as JSON response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during the search' });
  }
})

const lookupRecipe = async (rid) => {
  const db = await Connection.open(mongoUri, DB)
  const foundRecipe = await db.collection(RECIPES).findOne({ id: rid })
  return foundRecipe
}

app.get('/update/:rid', async (req, res) => {
  const rid = parseInt(req.params.rid)
  const recipe = await lookupRecipe(rid)
  if (!recipe) {
    req.flash('error', `No such recipe: ${req.params.rid}`)
    return res.redirect('/')
  }
  return res.render('update.ejs', { recipe })
})

app.post('/update/:rid', async (req, res) => {
  const rid = parseInt(req.params.rid)
  if (rid.toString() !== rid) {
    req.flash('error', `non-integer recipeID in URL: ${rid}`)
    return res.redirect('/')
  }
  const db = await Connection.open(mongoUri, DB)
  const recipe = {
    id: rid,
    title: req.body.title,
    servings: req.body.servings,
    time: req.body.time,
    ingredients: req.body.ingredients,
    directions: req.body.directions
  }
  const errors = checkInputs(recipe)
  if (errors.length > 0) {
    // re-render the page, displaying any form entry errors we found earlier
    errors.forEach((err) => {
      req.flash('info', err)
    })
    return res.render('update.ejs', { recipe })
  }
  const result = await db.collection(RECIPES).updateOne(
    { id: rid },
    { $set: recipe }
  )
  if (result.matchedCount === 1 && result.modifiedCount === 1) {
    flash('info', `recipe ${rid} updated`)
    return res.render('update.ejs', { recipe })
  } else {
    flash('error', `error updating ${rid}: ${JSON.stringify(result)}`)
    return res.render('update.ejs', { recipe })
  }
})

app.post('/delete/:rid', async (req, res) => {
  const rid = parseInt(req.params.rid)
  const db = await Connection.open(mongoUri, DB)
  const deleted = await db.collection(RECIPES).deleteOne({ id: rid })
  if (deleted.deletedCount === 1) {
    req.flash('info', `Recipe (${rid}) was deleted successfully.`)
    return res.redirect('/')
  } else {
    req.flash('error', `Error deleting ${rid}: ${JSON.stringify(deleted)}`)
    return res.redirect('/update/' + rid)
  }
})

// app.get('/select', async (req, res) => {
//   // only select data from id and title fields
//   const projection = { id: 1, title: 1 }
//   const db = await Connection.open(mongoUri, DB)
//   // be sure to include the 'toArray', or await won't work
//   const incompleteRecipes = await db.collection(RECIPES)
//     .find({
//       $or: [
//         { release: null },
//         { release: { $exists: false } },
//         { director: null },
//         { director: { $exists: false } }
//       ]
//     })
//     .project(projection)
//     .sort({ id: 1 })
//     .toArray()
//   return res.render('select.ejs', { recipes: incompleteRecipes })
// })

// app.get('/do-select', async (req, res) => {
//   const id = req.query.rid
//   return res.redirect('/update/' + id)
// })

// ================================================================================================

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
