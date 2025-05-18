import { ingredients } from '@/scripts/ingredients';

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
  categories: string[];
  ingredients: IngredientsType;
  directions: string[];
  ingredients_list: string[];
  date: Date;
  path: string;
};

export type LatestRecipe = {
  id: string;
  title: string;
  path: string;
};

// The database returns a number for amount,
// but we later format it to a string with the formatCurrency function
export type LatestRecipeRaw = Omit<LatestRecipe, 'amount'> & {
  amount: number;
};

export type RecipesTable = {
  id: number;
  title: string;
  servings: number;
  calories: number;
  date: Date;
  path: string;
};

export type IngredientsTableType = {
  id: number;
  name: string;
  path: string;
  total_recipes: number;
};

export type FormattedIngredientsTable = {
  id: number;
  name: string;
  path: string;
  total_recipes: number;
};

export type CategoriesTableType = {
  id: number;
  name: string;
  path: string;
  total_recipes: number;
};

export type FormattedCategoriesTable = {
  id: number;
  name: string;
  path: string;
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

type IngredientsType = {
  [key: string]: string[];
};

export type RecipeForm = {
  id: number;
  title: string;
  notes: string;
  time: number;
  servings: number;
  calories: number;
  categories: string[];
  ingredients: IngredientsType;
  directions: string[];
  date: Date;
  ingredients_list: string[];
  path: string;
};
