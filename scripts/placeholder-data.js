// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: 1,
    name: 'olivia',
    email: 'olivia.giandrea@gmail.com',
    password: '***',
  },
];

const categories = [
  { "name": "mains", "id": 1, },
  { "name": "poultry", "id": 2 },
  { "name": "soups", "id": 3 },
  { "name": "tofu", "id": 4 },
  { "name": "vegetarian", "id": 5 },
  { "name": "quick", "id": 6 },
  { "name": "seafood", "id": 7 },
  { "name": "beef", "id": 8 },
  { "name": "pasta", "id": 9 },
  { "name": "dessert", "id": 10 },
  { "name": "cookies", "id": 11 },
  { "name": "bread", "id": 12 },
  { "name": "quick bread", "id": 13 },
  { "name": "fruit", "id": 14 },
  { "name": "sides", "id": 15 },
  { "name": "bars", "id": 16 },
  { "name": "single serve", "id": 17 },
  { "name": "breakfast", "id": 18 },
  { "name": "pancakes", "id": 19 },
  { "name": "cake", "id": 20 },
  { "name": "scones", "id": 21 },
  { "name": "pizza", "id": 22 },
  { "name": "sausage", "id": 23 },
  { "name": "oatmeal", "id": 24 },
  { "name": "pie", "id": 25 },
  { "name": "cream", "id": 26 },
  { "name": "sauces", "id": 27 },
  { "name": "donuts", "id": 28 },
  { "name": "muffins", "id": 29 }
];

const favorites = [
  {
    "recipe_id": 1,
    "user_id": 1,
  }
];

const ratings = [
  {
    "recipe_id": 1,
    "user_id": 1,
    "rating": 5,
  }
];

module.exports = {
  users,
  categories,
  ratings, 
  favorites
};
