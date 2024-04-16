import { sql } from '@vercel/postgres';
import {
  IngredientField,
  CategoryField,
  IngredientsTableType,
  RecipeForm,
  RecipesTable,
  User,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchLatestRecipes() {
  noStore();
  try {
    const recipes = await sql`
      SELECT recipes.title, recipes.image_path, recipes.id
      FROM recipes
      ORDER BY recipes.date DESC
      LIMIT 5`;

    return recipes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest recipes.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    const recipeCountPromise = sql`SELECT COUNT(*) FROM recipes`;
    const mostCommonIngredientPromise = sql`
      SELECT name
      FROM ingredients
      JOIN recipe_ingredients ON recipe_ingredients.ingredient_id = ingredients.id
      GROUP BY name
      ORDER BY COUNT(*) DESC
      LIMIT 1
    `;
    const mostCommonCategoryPromise = sql`
      SELECT name
      FROM categories
      JOIN recipe_categories ON recipe_categories.category_id = categories.id
      GROUP BY name
      ORDER BY COUNT(*) DESC
      LIMIT 1
    `;

    const data = await Promise.all([
      recipeCountPromise,
      mostCommonIngredientPromise,
      mostCommonCategoryPromise,
    ]);

    const numberOfRecipes = Number(data[0].rows[0].count ?? '0');
    const mostCommonIngredient = Number(data[1].rows[0]?.name);
    const mostCommonCategory = Number(data[2].rows[0]?.name);

    return {
      numberOfRecipes,
      mostCommonIngredient,
      mostCommonCategory,
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
        recipes.title,
        recipes.notes,
        recipes.time,
        recipes.servings,
        recipes.calories,
        recipes.ingredients,
        recipes.directions,
        recipes.date,
        recipes.image_path
      FROM recipes
      WHERE
        recipes.title ILIKE ${`%${query}%`}
      ORDER BY recipes.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return recipes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes.');
  }
}

// JOIN recipes_ingredients ON recipes_ingredients.recipe_id = recipes.id
// JOIN ingredients ON recipes_ingredients.ingredient_id = ingredients.id
// JOIN recipes_categories ON recipes_categories.recipe_id = recipes.id
// JOIN categories ON recipes_categories.category_id = categories.id

export async function fetchRecipesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM recipes
    WHERE
      ingredients.title ILIKE ${`%${query}%`}
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

    return data.rows[0];
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

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all ingredients.');
  }
}

export async function fetchCategories() {
  try {
    const data = await sql<CategoryField>`
      SELECT
        id,
        name
      FROM categories
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categories.');
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

    return data.rows;
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
