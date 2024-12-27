const { categories } = require('./categories.js');
const { recipes } = require('./recipes.js');
const { ingredients } = require('./ingredients.js');

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
    path
  };
  
  updatedRecipes.push(updatedRecipe);

  ingredients_list.forEach(ingredient => {
    const foundIngredient = ingredients.find(ing => ing.name === ingredient);
    recipeIngredients.push({recipe_id: counter, ingredient_id: foundIngredient.id});
  });

  recipe_categories.forEach(category => {
    const foundCategory = categories.find(cat => cat.name === category);
    recipeCategories.push({recipe_id: counter, category_id: foundCategory.id});
  });

  counter = counter + 1;
});

const fs = require('fs');

fs.writeFileSync('app/lib/updatedRecipes.json', JSON.stringify(updatedRecipes, null, 2));
fs.writeFileSync('app/lib/recipeIngredients.json', JSON.stringify(recipeIngredients, null, 2));
fs.writeFileSync('app/lib/recipeCategories.json', JSON.stringify(recipeCategories, null, 2));

console.log('Files written successfully!');
