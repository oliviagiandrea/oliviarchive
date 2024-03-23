export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Ingredient = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Recipe = {
  id: string;
  ingredient_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestRecipe = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestRecipeRaw = Omit<LatestRecipe, 'amount'> & {
  amount: number;
};

export type RecipesTable = {
  id: string;
  ingredient_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type IngredientsTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_recipes: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedIngredientsTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_recipes: number;
  total_pending: string;
  total_paid: string;
};

export type IngredientField = {
  id: string;
  name: string;
};

export type RecipeForm = {
  id: string;
  ingredient_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
