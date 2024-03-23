import { sql } from '@vercel/postgres';
import {
  IngredientField,
  IngredientsTableType,
  RecipeForm,
  RecipesTable,
  LatestRecipeRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Adding noStore() here prevents the response from being cached
  noStore();
  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestRecipes() {
  noStore();
  try {
    const data = await sql<LatestRecipeRaw>`
      SELECT recipes.amount, ingredients.name, ingredients.image_url, ingredients.email, recipes.id
      FROM recipes
      JOIN ingredients ON recipes.ingredient_id = ingredients.id
      ORDER BY recipes.date DESC
      LIMIT 5`;

    const latestRecipes = data.rows.map((recipe) => ({
      ...recipe,
      amount: formatCurrency(recipe.amount),
    }));
    return latestRecipes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest recipes.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const recipeCountPromise = sql`SELECT COUNT(*) FROM recipes`;
    const ingredientCountPromise = sql`SELECT COUNT(*) FROM ingredients`;
    const recipeStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM recipes`;

    const data = await Promise.all([
      recipeCountPromise,
      ingredientCountPromise,
      recipeStatusPromise,
    ]);

    const numberOfRecipes = Number(data[0].rows[0].count ?? '0');
    const numberOfIngredients = Number(data[1].rows[0].count ?? '0');
    const totalPaidRecipes = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingRecipes = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfIngredients,
      numberOfRecipes,
      totalPaidRecipes,
      totalPendingRecipes,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredRecipes(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const recipes = await sql<RecipesTable>`
      SELECT
        recipes.id,
        recipes.amount,
        recipes.date,
        recipes.status,
        ingredients.name,
        ingredients.email,
        ingredients.image_url
      FROM recipes
      JOIN ingredients ON recipes.ingredient_id = ingredients.id
      WHERE
        ingredients.name ILIKE ${`%${query}%`} OR
        ingredients.email ILIKE ${`%${query}%`} OR
        recipes.amount::text ILIKE ${`%${query}%`} OR
        recipes.date::text ILIKE ${`%${query}%`} OR
        recipes.status ILIKE ${`%${query}%`}
      ORDER BY recipes.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return recipes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes.');
  }
}

export async function fetchRecipesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM recipes
    JOIN ingredients ON recipes.ingredient_id = ingredients.id
    WHERE
      ingredients.name ILIKE ${`%${query}%`} OR
      ingredients.email ILIKE ${`%${query}%`} OR
      recipes.amount::text ILIKE ${`%${query}%`} OR
      recipes.date::text ILIKE ${`%${query}%`} OR
      recipes.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of recipes.');
  }
}

export async function fetchRecipeById(id: string) {
  noStore();
  try {
    const data = await sql<RecipeForm>`
      SELECT
        recipes.id,
        recipes.ingredient_id,
        recipes.amount,
        recipes.status
      FROM recipes
      WHERE recipes.id = ${id};
    `;

    const recipe = data.rows.map((recipe) => ({
      ...recipe,
      // Convert amount from cents to dollars
      amount: recipe.amount / 100,
    }));

    return recipe[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipe.');
  }
}

export async function fetchIngredients() {
  try {
    const data = await sql<IngredientField>`
      SELECT
        id,
        name
      FROM ingredients
      ORDER BY name ASC
    `;

    const ingredients = data.rows;
    return ingredients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all ingredients.');
  }
}

export async function fetchFilteredIngredients(query: string) {
  noStore();
  try {
    const data = await sql<IngredientsTableType>`
		SELECT
		  ingredients.id,
		  ingredients.name,
		  ingredients.email,
		  ingredients.image_url,
		  COUNT(recipes.id) AS total_recipes,
		  SUM(CASE WHEN recipes.status = 'pending' THEN recipes.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN recipes.status = 'paid' THEN recipes.amount ELSE 0 END) AS total_paid
		FROM ingredients
		LEFT JOIN recipes ON ingredients.id = recipes.ingredient_id
		WHERE
		  ingredients.name ILIKE ${`%${query}%`} OR
        ingredients.email ILIKE ${`%${query}%`}
		GROUP BY ingredients.id, ingredients.name, ingredients.email, ingredients.image_url
		ORDER BY ingredients.name ASC
	  `;

    const ingredients = data.rows.map((ingredient) => ({
      ...ingredient,
      total_pending: formatCurrency(ingredient.total_pending),
      total_paid: formatCurrency(ingredient.total_paid),
    }));

    return ingredients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch ingredient table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
