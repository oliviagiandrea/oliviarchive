const users = [
  {
    id: 1,
    name: 'olivia',
    email: 'olivia.giandrea@gmail.com',
    password: 'asm707',
  },
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
  ratings, 
  favorites
};
