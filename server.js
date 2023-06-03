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
const ING = 'ingredients'
const COUNTERS = 'counters'

app.get('/', async (req, res) => {
  const db = await Connection.open(mongoUri, DB)
  const recipes = await db.collection(RECIPES).find().toArray()
  return res.render('index.ejs', { recipes })
})

app.get('/ing', async (req, res) => {
  const db = await Connection.open(mongoUri, DB)
  const ingredients = await db.collection(ING).find().sort({ name: 1 }).toArray()
  return res.render('ing.ejs', { ingredients, ing: "" })
})

app.post('/ing', async (req, res) => {
  let ingredient = req.body.ing
  const db = await Connection.open(mongoUri, DB)
  let ingredients = await db.collection(ING).find().sort({ name: 1 }).toArray()
  if (!ingredient) {
    req.flash('info', 'Missing Input: Please specify at least 1 ingredient.')
    return res.render('ing.ejs', { ingredients, ing: "" })
  }
  let result;
  if (ingredient.includes(',')) {
    const ingredients = ingredient.split(', ');
    const bulkOps = ingredients.map(ing => ({
      updateOne: {
        filter: { name: ing },
        update: { $setOnInsert: { name: ing } },
        upsert: true
      }
    }));
    result = await db.collection(ING).bulkWrite(bulkOps);
  } else {
    result = await db.collection(ING).updateOne(
      { name: ingredient },
      { $setOnInsert: { name: ingredient } },
      { upsert: true }
    );
  }
  ingredients = await db.collection(ING).find().sort({ name: 1 }).toArray();
  req.flash('info', `Successfully added ${ingredient} to ingredients collection`);
  return res.render('ing.ejs', { ingredients, ing: "" });
})

app.get('/insert', async (req, res) => {
  const db = await Connection.open(mongoUri, DB)
  const ingredients = await db.collection(ING).find().sort({ name: 1 }).toArray()
  const recipe = { title: '', servings: '', time: '', ingredients: [], directions: [], imagePath: "" }
  return res.render('insert.ejs', { recipe, ingredients })
})

const checkInputs = (recipe) => {
  const errors = []
  if (recipe.title.length === 0) {
    errors.push('Missing Input: Please specify a title.')
  }
  if (recipe.servings.length === 0) {
    errors.push('Missing Input: Please specify the amount of servings made.')
  }
  const sInt = parseInt(recipe.servings)
  if (isNaN(sInt) || sInt.toString() !== recipe.servings) {
    errors.push(`(${recipe.servings}) (servings amount) is not an integer.`)
  }
  if (recipe.time.length === 0) {
    errors.push('Missing Input: Please specify how long (in minutes) this recipe takes to make.')
  }
  const tInt = parseInt(recipe.time)
  if (isNaN(tInt) || tInt.toString() !== recipe.time) {
    errors.push(`(${recipe.time}) (time amount) is not an integer.`)
  }
  if (!recipe.categories) {
    errors.push('Missing Input: Please specify at least 1 category.')
  }
  if (!recipe.ingredientList) {
    errors.push('Missing Input: Please specify at least 1 ingredient used.')
  }
  if (recipe.ingredients[0].length === 0) {
    errors.push('Missing Input: Please specify at least 1 ingredient.')
  }
  if (recipe.directions[0].length === 0) {
    errors.push('Missing Input: Please specify at least 1 direction step.')
  }
  return errors
}

app.post('/insert', upload.single('photo'), async (req, res) => {
  try {
    const recipe = req.body
    const errors = checkInputs(recipe)
    if (errors.length > 0) {
      // re-render the page, displaying any form entry errors we found earlier
      errors.forEach((err) => req.flash('info', err))
      return res.render('insert.ejs', { recipe })
    }
    if (!req.file) {
      req.flash('info', 'Missing Input: Please upload a recipe image.')
      return res.render('insert.ejs', { recipe })
    }
    var fPath = (req.file.path).replace("public\\imgs\\", "")
    recipe.imagePath = fPath
    const db = await Connection.open(mongoUri, DB)
    const rid = await db.collection(COUNTERS).findOneAndUpdate(
      { _id: new ObjectId('64532e4de8ba3356173af515') },
      { $inc: { seq: 1 } },
      { returnOriginal: false, upsert: true }
    )
    recipe.id = rid.value.seq
    // get rid of empty elements in ingredient and direction arrays
    recipe.ingredients = recipe.ingredients.filter(n => n)
    recipe.directions = recipe.directions.filter(n => n)
    recipe.date = new Date()
    const result = await db.collection(RECIPES).insertOne(recipe)
    if (result.matchedCount === 1 && result.upsertedCount === 0) {
      req.flash('error', `Error: id ${recipe.id} in use`)
      return res.render('insert.ejs', { recipe })
    }
    return res.redirect('/update/' + recipe.id)
  } catch (err) {
    req.flash('error', `Error inserting recipe: ${JSON.stringify(err)}.`)
    return res.redirect('/')
  }
})

app.get('/update/:rid', async (req, res) => {
  const rid = parseInt(req.params.rid)
  const db = await Connection.open(mongoUri, DB)
  const recipe = await db.collection(RECIPES).findOne({ id: rid })
  if (!recipe) {
    req.flash('error', `No such recipe: ${req.params.rid}`)
    return res.redirect('/')
  }
  const ingredients = await db.collection(ING).find().sort({ name: 1 }).toArray()
  return res.render('update.ejs', { recipe, ingredients, categories: recipe.categories })
})

app.post('/update/:rid', async (req, res) => {
  const rid = parseInt(req.params.rid)
  if (rid.toString() === rid) {
    req.flash('error', `non-integer recipeID in URL: ${rid}`)
    return res.redirect('/')
  }
  const db = await Connection.open(mongoUri, DB)
  const ingredients = await db.collection(ING).find().sort({ name: 1 }).toArray()
  const recipe = {
    id: rid,
    title: req.body.title,
    notes: req.body.notes,
    servings: req.body.servings,
    time: req.body.time,
    reference: req.body.reference,
    categories: req.body.categories,
    ingredientList: req.body.ingredientList,
    ingredients: req.body.ingredients.filter(n => n),
    directions: req.body.directions.filter(n => n),
    date: new Date()
  }
  const errors = checkInputs(recipe)
  if (errors.length > 0) {
    // re-render the page, displaying any form entry errors we found earlier
    errors.forEach((err) => {
      req.flash('info', err)
    })
    return res.render('update.ejs', { recipe, ingredients, categories: recipe.categories })
  }
  const result = await db.collection(RECIPES).updateOne(
    { id: rid },
    { $set: recipe }
  )
  if (result.matchedCount === 1 && result.modifiedCount === 1) {
    flash('info', `recipe ${rid} updated`)
    return res.render('update.ejs', { recipe, ingredients, categories: recipe.categories })
  } else {
    flash('error', `error updating ${rid}: ${JSON.stringify(result)}`)
    return res.render('update.ejs', { recipe, ingredients, categories: recipe.categories })
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

app.get('/recipe/:rid', async (req, res) => {
  const rid = parseInt(req.params.rid)
  const db = await Connection.open(mongoUri, DB)
  const recipe = await db.collection(RECIPES).findOne({ id: rid })
  if (!recipe) {
    req.flash('error', `No such recipe: ${req.params.rid}`)
    return res.redirect('/')
  }
  const newest = await db.collection(RECIPES).find().limit(5).toArray()
  const similar = await db.collection(RECIPES).find({ categories: recipe.categories[0] }).limit(5).toArray()
  return res.render('recipe.ejs', { recipe, newest, similar })
})

app.get('/search', async (req, res) => {
  const db = await Connection.open(mongoUri, DB)
  const recipes = await db.collection(RECIPES).find().toArray()
  const ingredients = await db.collection(ING).find().sort({ name: 1 }).toArray()
  return res.render('search.ejs', { recipes, ingredients })
})

app.post('/search', async (req, res) => {
  // use a regex expression to ignore case and look for partial matches
  const db = await Connection.open(mongoUri, DB)
  try {
    let found;
    switch (true) {
      case req.body.title?.length > 0 && req.body.categories?.length > 0 && req.body.ingInclude?.length > 0 && req.body.ingExclude?.length > 0:
        found = await db.collection(RECIPES).find({
          title: { $regex: new RegExp(req.body.title, 'i') },
          categories: { $all: req.body.categories },
          ingredientList: { $all: req.body.ingInclude, $nin: req.body.ingExclude }
        }).toArray();
        break;

      case req.body.title?.length > 0 && req.body.categories?.length > 0 && req.body.ingInclude?.length > 0:
        found = await db.collection(RECIPES).find({
          title: { $regex: new RegExp(req.body.title, 'i') },
          categories: { $all: req.body.categories },
          ingredientList: { $all: req.body.ingInclude }
        }).toArray();
        break;

      case req.body.title?.length > 0 && req.body.categories?.length > 0 && req.body.ingExclude?.length > 0:
        found = await db.collection(RECIPES).find({
          title: { $regex: new RegExp(req.body.title, 'i') },
          categories: { $all: req.body.categories },
          ingredientList: { $nin: req.body.ingExclude }
        }).toArray();
        break;

      case req.body.title?.length > 0 && req.body.categories?.length > 0:
        found = await db.collection(RECIPES).find({
          title: { $regex: new RegExp(req.body.title, 'i') },
          categories: { $all: req.body.categories }
        }).toArray();
        break;

      case req.body.title?.length > 0 && req.body.ingInclude?.length > 0 && req.body.ingExclude?.length > 0:
        found = await db.collection(RECIPES).find({
          title: { $regex: new RegExp(req.body.title, 'i') },
          ingredientList: { $all: req.body.ingInclude, $nin: req.body.ingExclude }
        }).toArray();
        break;

      case req.body.title?.length > 0 && req.body.ingInclude?.length > 0:
        found = await db.collection(RECIPES).find({
          title: { $regex: new RegExp(req.body.title, 'i') },
          ingredientList: { $all: req.body.ingInclude }
        }).toArray();
        break;

      case req.body.title?.length > 0 && req.body.ingExclude?.length > 0:
        found = await db.collection(RECIPES).find({
          title: { $regex: new RegExp(req.body.title, 'i') },
          ingredientList: { $nin: req.body.ingExclude }
        }).toArray();
        break;

      case req.body.title?.length > 0:
        found = await db.collection(RECIPES).find({
          title: { $regex: new RegExp(req.body.title, 'i') }
        }).toArray();
        break;

      case req.body.categories?.length > 0 && req.body.ingInclude?.length > 0 && req.body.ingExclude?.length > 0:
        found = await db.collection(RECIPES).find({
          categories: { $all: req.body.categories },
          ingredientList: { $all: req.body.ingInclude, $nin: req.body.ingExclude }
        }).toArray();
        break;
      
      case req.body.categories?.length > 0 && req.body.ingInclude?.length > 0:
        found = await db.collection(RECIPES).find({
          categories: { $all: req.body.categories },
          ingredientList: { $all: req.body.ingInclude }
        }).toArray();
        break;

      case req.body.categories?.length > 0 && req.body.ingExclude?.length > 0:
          found = await db.collection(RECIPES).find({
            categories: { $all: req.body.categories },
            ingredientList: { $nin: req.body.ingExclude }
          }).toArray();
          break;

      case req.body.categories?.length > 0:
        found = await db.collection(RECIPES).find({
          categories: { $all: req.body.categories },
        }).toArray();
        break;

      case req.body.ingInclude?.length > 0 && req.body.ingExclude?.length > 0:
        found = await db.collection(RECIPES).find({
          ingredientList: { $all: req.body.ingInclude, $nin: req.body.ingExclude }
        }).toArray();
        break;

      case req.body.ingInclude?.length > 0:
        found = await db.collection(RECIPES).find({
          ingredientList: { $all: req.body.ingInclude }
        }).toArray();
        break;

      default:
        // req.body.ingExclude?.length > 0
        found = await db.collection(RECIPES).find({
          ingredientList: { $nin: req.body.ingExclude }
        }).toArray();
        break;
    }
    return res.json(found); // sending the search results as JSON response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during the search' });
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
