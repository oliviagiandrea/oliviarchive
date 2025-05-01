const fs = require('fs');
const { categories } = require('./categories.js');
const { recipes } = require('./recipes.js');
const { ingredients } = require('./ingredients.js');

// let updatedIngredients = [];
// let counter = 0;

// ingredients.forEach((ingredient) => {
//   const { name } = ingredient;
//   updatedIngredients.push({ id: counter, name });
//   counter = counter + 1;
// })

// fs.writeFileSync('app/lib/updatedIngredients.json', JSON.stringify(updatedIngredients, null, 2));

let updatedRecipes = [];
let recipeIngredients = [];
let recipeCategories = [];
let counter = 0;

recipes.forEach((recipe) => {
  const { title, notes, time, servings, calories, categories: recipe_categories, ingredients: recipe_ingredients, ingredients_list, directions, date, path } = recipe;
  const updatedRecipe = {
    id: counter,
    title,
    notes,
    time,
    servings,
    calories,
    ingredients: recipe_ingredients,
    directions,
    date,
    path,
    categories: [],
    ingredients_list: []
  };

  recipe_categories.forEach(category => {
    const foundCategory = categories.find(cat => cat.name === category);
    recipeCategories.push({ recipe_id: counter, category_id: foundCategory.id });
    updatedRecipe.categories.push(foundCategory.id);
  });

  ingredients_list.forEach(ingredient => {
    const foundIngredient = ingredients.find(ing => ing.name === ingredient);
    recipeIngredients.push({ recipe_id: counter, ingredient_id: foundIngredient.id });
    updatedRecipe.ingredients_list.push(foundIngredient.id);
  });

  updatedRecipes.push(updatedRecipe);
  counter = counter + 1;
});

fs.writeFileSync('app/lib/updatedRecipes.json', JSON.stringify(updatedRecipes, null, 2));
fs.writeFileSync('app/lib/recipeIngredients.json', JSON.stringify(recipeIngredients, null, 2));
fs.writeFileSync('app/lib/recipeCategories.json', JSON.stringify(recipeCategories, null, 2));

console.log('Files written successfully!');
