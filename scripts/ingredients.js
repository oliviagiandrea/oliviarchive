const ingredients = [
  { "id": 1, "name": "all-purpose flour" },
  { "id": 2, "name": "almond flour" },
  { "id": 3, "name": "apple" },
  { "id": 4, "name": "apple cider vinegar" },
  { "id": 5, "name": "apple juice" },
  { "id": 6, "name": "applesauce" },
  { "id": 7, "name": "avocado" },
  { "id": 8, "name": "balsamic vinegar" },
  { "id": 9, "name": "banana" },
  { "id": 10, "name": "basil" },
  { "id": 11, "name": "beef" },
  { "id": 12, "name": "bell pepper" },
  { "id": 13, "name": "blueberries" },
  { "id": 14, "name": "bread" },
  { "id": 15, "name": "breadcrumbs" },
  { "id": 16, "name": "bread flour" },
  { "id": 17, "name": "brown sugar" },
  { "id": 18, "name": "butter" },
  { "id": 19, "name": "buttermilk" },
  { "id": 20, "name": "cake flour" },
  { "id": 21, "name": "carrot" },
  { "id": 22, "name": "celery" },
  { "id": 23, "name": "chia seeds" },
  { "id": 24, "name": "chicken" },
  { "id": 25, "name": "chicken broth" },
  { "id": 26, "name": "chocolate" },
  { "id": 27, "name": "cinnamon" },
  { "id": 28, "name": "cilantro" },
  { "id": 29, "name": "cocoa powder" },
  { "id": 30, "name": "coconut milk" },
  { "id": 31, "name": "corn" },
  { "id": 32, "name": "cornflakes" },
  { "id": 33, "name": "cornmeal" },
  { "id": 34, "name": "cornstarch" },
  { "id": 35, "name": "cream cheese" },
  { "id": 36, "name": "craisins" },
  { "id": 37, "name": "crushed tomatoes" },
  { "id": 38, "name": "cucumber" },
  { "id": 39, "name": "dashi" },
  { "id": 40, "name": "dates" },
  { "id": 41, "name": "diced tomatoes" },
  { "id": 42, "name": "dijon mustard" },
  { "id": 43, "name": "dumplings" },
  { "id": 44, "name": "edamame" },
  { "id": 45, "name": "egg" },
  { "id": 46, "name": "egg whites" },
  { "id": 47, "name": "evaporated milk" },
  { "id": 48, "name": "extra firm tofu" },
  { "id": 49, "name": "feta" },
  { "id": 50, "name": "flax seed" },
  { "id": 51, "name": "garlic" },
  { "id": 52, "name": "ginger" },
  { "id": 53, "name": "granulated sugar" },
  { "id": 54, "name": "half-and-half" },
  { "id": 55, "name": "heavy cream" },
  { "id": 56, "name": "honey" },
  { "id": 57, "name": "jam" },
  { "id": 58, "name": "kale" },
  { "id": 59, "name": "ketchup" },
  { "id": 60, "name": "lemon" },
  { "id": 61, "name": "lemon juice" },
  { "id": 62, "name": "lentils" },
  { "id": 63, "name": "lettuce" },
  { "id": 64, "name": "lime juice" },
  { "id": 65, "name": "macadamia nuts" },
  { "id": 66, "name": "maple syrup" },
  { "id": 67, "name": "marshmallow fluff" },
  { "id": 68, "name": "matcha powder" },
  { "id": 69, "name": "mayonnaise" },
  { "id": 70, "name": "milk" },
  { "id": 71, "name": "mirin" },
  { "id": 72, "name": "miso" },
  { "id": 73, "name": "molasses" },
  { "id": 74, "name": "mozzarella" },
  { "id": 75, "name": "mushrooms" },
  { "id": 76, "name": "mustard" },
  { "id": 77, "name": "oat flour" },
  { "id": 78, "name": "oil" },
  { "id": 79, "name": "old-fashioned rolled oats" },
  { "id": 80, "name": "onion" },
  { "id": 81, "name": "orange" },
  { "id": 82, "name": "parsley" },
  { "id": 83, "name": "parmesan" },
  { "id": 84, "name": "pasta" },
  { "id": 85, "name": "peas" },
  { "id": 86, "name": "pecans" },
  { "id": 87, "name": "peanut butter" },
  { "id": 88, "name": "pear" },
  { "id": 89, "name": "pickles" },
  { "id": 90, "name": "pineapple" },
  { "id": 91, "name": "poppy seeds" },
  { "id": 92, "name": "potato" },
  { "id": 93, "name": "powdered peanut butter" },
  { "id": 94, "name": "powdered sugar" },
  { "id": 95, "name": "prosciutto" },
  { "id": 96, "name": "pumpkin purée" },
  { "id": 97, "name": "quick oats" },
  { "id": 98, "name": "raisins" },
  { "id": 99, "name": "ramen" },
  { "id": 100, "name": "raspberries" },
  { "id": 101, "name": "red wine vinegar" },
  { "id": 102, "name": "rice" },
  { "id": 103, "name": "rice cereal" },
  { "id": 104, "name": "rice vinegar" },
  { "id": 105, "name": "ricotta" },
  { "id": 106, "name": "sake" },
  { "id": 107, "name": "salmon" },
  { "id": 108, "name": "salsa" },
  { "id": 109, "name": "sausage" },
  { "id": 110, "name": "scallions" },
  { "id": 111, "name": "seaweed salad" },
  { "id": 112, "name": "shallot" },
  { "id": 113, "name": "shortening" },
  { "id": 114, "name": "shredded coconut" },
  { "id": 115, "name": "silken tofu" },
  { "id": 116, "name": "soy sauce" },
  { "id": 117, "name": "spinach" },
  { "id": 118, "name": "strawberries" },
  { "id": 119, "name": "sweet potato" },
  { "id": 120, "name": "tapioca flour" },
  { "id": 121, "name": "tea" },
  { "id": 122, "name": "tomato" },
  { "id": 123, "name": "tomato paste" },
  { "id": 124, "name": "tomato sauce" },
  { "id": 125, "name": "tortilla" },
  { "id": 126, "name": "tortilla chips" },
  { "id": 127, "name": "tuna" },
  { "id": 128, "name": "turkey" },
  { "id": 129, "name": "walnut" },
  { "id": 130, "name": "wheat bran" },
  { "id": 131, "name": "white chocolate" },
  { "id": 132, "name": "white vinegar" },
  { "id": 133, "name": "white wine" },
  { "id": 134, "name": "white wine vinegar" },
  { "id": 135, "name": "whole wheat flour" },
  { "id": 136, "name": "yeast" },
  { "id": 137, "name": "yogurt" },
  { "id": 138, "name": "zucchini" }
];

module.exports = { ingredients };