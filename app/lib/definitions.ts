export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Ingredient = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Recipe = {
  id: number;
  title: string;
  notes: string;
  time: number;
  servings: number;
  calories: number;
  ingredients: object;
  directions: [string];
  date: Date;
  image_path: string;
};

export type LatestRecipe = {
  id: string;
  title: string;
  image_path: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestRecipeRaw = Omit<LatestRecipe, 'amount'> & {
  amount: number;
};

export type RecipesTable = {
  id: number;
  title: string;
  servings: number;
  calories: number;
  date: Date;
  image_path: string;
};

export type IngredientsTableType = {
  id: number;
  name: string;
  image_path: string;
  total_recipes: number;
};

export type FormattedIngredientsTable = {
  id: number;
  name: string;
  image_path: string;
  total_recipes: number;
};

export type CategoriesTableType = {
  id: number;
  name: string;
  image_path: string;
  total_recipes: number;
};

export type FormattedCategoriesTable = {
  id: number;
  name: string;
  image_path: string;
  total_recipes: number;
};

export type IngredientField = {
  id: number;
  name: string;
};

export type CategoryField = {
  id: number;
  name: string;
};

export type RecipeForm = {
  id: number;
  ingredient_id: number;
  category_id: number;
};
