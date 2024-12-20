const ingredients = [
  {
    "name": "butter",
    "id": 3
  },
  {
    "name": "oil",
    "id": 4
  },
  {
    "name": "cheese",
    "id": 6
  },
  {
    "name": "vinegar, balsamic",
    "id": 7
  },
  {
    "name": "cinnamon",
    "id": 8
  },
  {
    "name": "almonds",
    "id": 10
  },
  {
    "name": "bell pepper",
    "id": 11
  },
  {
    "name": "bread",
    "id": 12
  },
  {
    "name": "chia seeds",
    "id": 14
  },
  {
    "name": "cornflakes",
    "id": 15
  },
  {
    "name": "craisins",
    "id": 16
  },
  {
    "name": "egg whites",
    "id": 17
  },
  {
    "name": "evaporated milk",
    "id": 18
  },
  {
    "name": "chicken broth",
    "id": 19
  },
  {
    "name": "broccoli",
    "id": 21
  },
  {
    "name": "vinegar, apple cider",
    "id": 22
  },
  {
    "name": "sauce, BBQ",
    "id": 23
  },
  {
    "name": "blueberries",
    "id": 24
  },
  {
    "name": "buttermilk",
    "id": 26
  },
  {
    "name": "garlic",
    "id": 28
  },
  {
    "name": "apple",
    "id": 29
  },
  {
    "name": "dashi",
    "id": 33
  },
  {
    "name": "edamame",
    "id": 34
  },
  {
    "name": "cucumber",
    "id": 36
  },
  {
    "name": "dijon mustard",
    "id": 37
  },
  {
    "name": "cocoa powder",
    "id": 38
  },
  {
    "name": "corn",
    "id": 39
  },
  {
    "name": "cream cheese",
    "id": 40
  },
  {
    "name": "celery",
    "id": 41
  },
  {
    "name": "cottage cheese",
    "id": 44
  },
  {
    "name": "ginger",
    "id": 45
  },
  {
    "name": "beef",
    "id": 46
  },
  {
    "name": "bourbon",
    "id": 47
  },
  {
    "name": "feta",
    "id": 49
  },
  {
    "name": "yogurt",
    "id": 50
  },
  {
    "name": "breadcrumbs",
    "id": 51
  },
  {
    "name": "chocolate",
    "id": 52
  },
  {
    "name": "cilantro",
    "id": 53
  },
  {
    "name": "flour, bread",
    "id": 54
  },
  {
    "name": "sugar, granulated",
    "id": 55
  },
  {
    "name": "flour, cake",
    "id": 56
  },
  {
    "name": "tomatoes, diced",
    "id": 57
  },
  {
    "name": "egg",
    "id": 58
  },
  {
    "name": "avocado",
    "id": 59
  },
  {
    "name": "banana",
    "id": 60
  },
  {
    "name": "basil",
    "id": 61
  },
  {
    "name": "sugar, brown",
    "id": 62
  },
  {
    "name": "carrot",
    "id": 63
  },
  {
    "name": "chicken",
    "id": 64
  },
  {
    "name": "coconut milk",
    "id": 65
  },
  {
    "name": "flour, almond",
    "id": 66
  },
  {
    "name": "flour, all-purpose",
    "id": 68
  },
  {
    "name": "apple juice",
    "id": 69
  },
  {
    "name": "applesauce",
    "id": 70
  },
  {
    "name": "cornmeal",
    "id": 71
  },
  {
    "name": "cornstarch",
    "id": 72
  },
  {
    "name": "beans",
    "id": 77
  },
  {
    "name": "dates",
    "id": 78
  },
  {
    "name": "dumplings",
    "id": 79
  },
  {
    "name": "flax seed",
    "id": 80
  },
  {
    "name": "maple syrup",
    "id": 81
  },
  {
    "name": "honey",
    "id": 82
  },
  {
    "name": "ketchup",
    "id": 83
  },
  {
    "name": "lentils",
    "id": 84
  },
  {
    "name": "half-and-half",
    "id": 85
  },
  {
    "name": "miso",
    "id": 86
  },
  {
    "name": "seaweed salad",
    "id": 87
  },
  {
    "name": "matcha powder",
    "id": 88
  },
  {
    "name": "macadamia nuts",
    "id": 89
  },
  {
    "name": "mozzarella",
    "id": 90
  },
  {
    "name": "salmon",
    "id": 91
  },
  {
    "name": "salsa",
    "id": 92
  },
  {
    "name": "lemon juice",
    "id": 93
  },
  {
    "name": "kale",
    "id": 94
  },
  {
    "name": "milk",
    "id": 95
  },
  {
    "name": "pear",
    "id": 97
  },
  {
    "name": "pickles",
    "id": 98
  },
  {
    "name": "shallot",
    "id": 100
  },
  {
    "name": "onion",
    "id": 101
  },
  {
    "name": "peanut butter",
    "id": 102
  },
  {
    "name": "oats, quick",
    "id": 103
  },
  {
    "name": "flour, oat",
    "id": 104
  },
  {
    "name": "pie crust",
    "id": 105
  },
  {
    "name": "flour, tapioca",
    "id": 106
  },
  {
    "name": "mirin",
    "id": 108
  },
  {
    "name": "mushrooms",
    "id": 109
  },
  {
    "name": "pasta",
    "id": 110
  },
  {
    "name": "sauce, pasta",
    "id": 111
  },
  {
    "name": "sauce, taco",
    "id": 112
  },
  {
    "name": "lime juice",
    "id": 113
  },
  {
    "name": "vinegar, red wine",
    "id": 115
  },
  {
    "name": "sake",
    "id": 116
  },
  {
    "name": "pineapple",
    "id": 120
  },
  {
    "name": "peanut butter, powdered",
    "id": 121
  },
  {
    "name": "vinegar, rice",
    "id": 122
  },
  {
    "name": "molasses",
    "id": 123
  },
  {
    "name": "mayonnaise",
    "id": 125
  },
  {
    "name": "soy sauce",
    "id": 128
  },
  {
    "name": "tofu, extra firm",
    "id": 74
  },
  {
    "name": "tofu, silken",
    "id": 127
  },
  {
    "name": "tomatoes, crushed",
    "id": 27
  },
  {
    "name": "parmesan",
    "id": 130
  },
  {
    "name": "poppy seeds",
    "id": 131
  },
  {
    "name": "tea",
    "id": 132
  },
  {
    "name": "peas",
    "id": 133
  },
  {
    "name": "pecans",
    "id": 134
  },
  {
    "name": "sugar, powdered",
    "id": 135
  },
  {
    "name": "shortening",
    "id": 137
  },
  {
    "name": "shredded coconut",
    "id": 138
  },
  {
    "name": "oats, old-fashioned rolled",
    "id": 139
  },
  {
    "name": "orange",
    "id": 140
  },
  {
    "name": "potato",
    "id": 142
  },
  {
    "name": "prosciutto",
    "id": 143
  },
  {
    "name": "strawberries",
    "id": 144
  },
  {
    "name": "marshmallow fluff",
    "id": 145
  },
  {
    "name": "jam",
    "id": 147
  },
  {
    "name": "pumpkin purée",
    "id": 149
  },
  {
    "name": "raspberries",
    "id": 150
  },
  {
    "name": "lemon",
    "id": 151
  },
  {
    "name": "lettuce",
    "id": 152
  },
  {
    "name": "mustard",
    "id": 153
  },
  {
    "name": "rice",
    "id": 154
  },
  {
    "name": "rice cereal",
    "id": 155
  },
  {
    "name": "ricotta",
    "id": 156
  },
  {
    "name": "sausage",
    "id": 157
  },
  {
    "name": "spinach",
    "id": 158
  },
  {
    "name": "sweet potato",
    "id": 159
  },
  {
    "name": "parsley",
    "id": 161
  },
  {
    "name": "raisins",
    "id": 163
  },
  {
    "name": "ramen",
    "id": 164
  },
  {
    "name": "scallions",
    "id": 165
  },
  {
    "name": "vinegar, white",
    "id": 167
  },
  {
    "name": "tortilla",
    "id": 169
  },
  {
    "name": "tomatoes, sauce",
    "id": 171
  },
  {
    "name": "white chocolate",
    "id": 172
  },
  {
    "name": "vinegar, white wine",
    "id": 174
  },
  {
    "name": "yeast",
    "id": 175
  },
  {
    "name": "white wine",
    "id": 176
  },
  {
    "name": "flour, whole wheat",
    "id": 177
  },
  {
    "name": "tortilla chips",
    "id": 179
  },
  {
    "name": "walnut",
    "id": 180
  },
  {
    "name": "tomato",
    "id": 181
  },
  {
    "name": "tomatoes, paste",
    "id": 182
  },
  {
    "name": "turkey",
    "id": 183
  },
  {
    "name": "tuna",
    "id": 184
  },
  {
    "name": "zucchini",
    "id": 185
  },
  {
    "name": "heavy cream",
    "id": 186
  },
  {
    "name": "sour cream",
    "id": 187
  },
  {
    "name": "wheat bran",
    "id": 188
  }
]

module.exports = { ingredients };