const { db } = require('@vercel/postgres');
const {
  users,
  ratings,
  favorites,
} = require('./placeholder-data.js');
const { recipes } = require('./updatedRecipes.js');
const { ingredients } = require('./ingredients.js');
const { categories } = require('./categories.js');
const { recipeIngredients } = require('./recipeIngredients.js');
const { recipeCategories } = require('./recipeCategories.js');
const bcrypt = require('bcrypt');

async function dropTables(client) {
  try {
    const dropTables = await client.sql`
      DROP TABLE IF EXISTS ingredients CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS recipes CASCADE;
      DROP TABLE IF EXISTS recipe_ingredients;
      DROP TABLE IF EXISTS recipe_categories;
    `;

    console.log(`Dropped tables`);

    return dropTables;
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} user(s)`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedRecipes(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        notes TEXT,
        time INT NOT NULL,
        servings INT NOT NULL,
        calories INT NOT NULL,
        ingredients JSONB NOT NULL,
        directions TEXT[] NOT NULL,
        ingredients_list TEXT[] NOT NULL,
        categories TEXT[] NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        path TEXT
      );
    `;

    console.log(`Created "recipes" table`);

    const insertedRecipes = await Promise.all(
      recipes.map(
        async (recipe) => {
          const insertResult = await client.sql`
            INSERT INTO recipes (id, title, notes, time, servings, calories, ingredients, directions, ingredients_list, categories, date, path)
            VALUES (${recipe.id}, ${recipe.title}, ${recipe.notes}, ${recipe.time}, ${recipe.servings}, ${recipe.calories}, ${recipe.ingredients}, ${recipe.directions}, ${recipe.ingredients_list}, ${recipe.categories}, ${recipe.date}, ${recipe.path})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      )
    );

    console.log(`Seeded ${insertedRecipes.length} recipes`);

    return {
      createTable,
      recipes: insertedRecipes,
    };
  } catch (error) {
    console.error('Error seeding recipes:', error);
    throw error;
  }
}

async function seedIngredients(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS ingredients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        path TEXT
      );
    `;

    console.log(`Created "ingredients" table`);

    const insertedIngredients = await Promise.all(
      ingredients.map(
        (ingredient) => client.sql`
          INSERT INTO ingredients (id, name, path)
          VALUES (${ingredient.id}, ${ingredient.name}, ${ingredient.path})
          ON CONFLICT (name) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedIngredients.length} ingredients`);

    return {
      createTable,
      ingredients: insertedIngredients,
    };
  } catch (error) {
    console.error('Error seeding ingredients:', error);
    throw error;
  }
}

async function seedCategories(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        path TEXT
      );
    `;

    console.log(`Created "categories" table`);

    const insertedCategories = await Promise.all(
      categories.map(
        (category) => client.sql`
          INSERT INTO categories (id, name, path)
          VALUES (${category.id}, ${category.name}, ${category.path})
          ON CONFLICT (name) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedCategories.length} categories`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

async function seedRecipeIngredients(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE recipe_ingredients (
        recipe_id INT REFERENCES recipes(id),
        ingredient_id INT REFERENCES ingredients(id),
        PRIMARY KEY (recipe_id, ingredient_id)
      );
    `;

    console.log(`Created "recipe_ingredients" table`);

    const insertedRecipeIngredients = await Promise.all(
      recipeIngredients.map(
        (pairing) => client.sql`
          INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
          VALUES (${pairing.recipe_id}, ${pairing.ingredient_id})
          ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${recipeIngredients.length} recipe/ingredient pairs`);

    return {
      createTable,
      ratings: insertedRecipeIngredients,
    };
  } catch (error) {
    console.error('Error seeding recipe_ingredients:', error);
    throw error;
  }
}

async function seedRecipeCategories(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE recipe_categories (
        recipe_id INT REFERENCES recipes(id),
        category_id INT REFERENCES categories(id),
        PRIMARY KEY (recipe_id, category_id)
      );
    `;

    console.log(`Created "recipe_categories" table`);

    const insertedRecipeCategories = await Promise.all(
      recipeCategories.map(
        (pairing) => client.sql`
          INSERT INTO recipe_categories (recipe_id, category_id)
          VALUES (${pairing.recipe_id}, ${pairing.category_id})
          ON CONFLICT (recipe_id, category_id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${recipeCategories.length} recipe/category pairs`);

    return {
      createTable,
      ratings: insertedRecipeCategories,
    };
  } catch (error) {
    console.error('Error seeding recipe_categories:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await dropTables(client);
  await seedUsers(client);
  await seedCategories(client);
  await seedIngredients(client);
  await seedRecipes(client);
  await seedRecipeIngredients(client);
  await seedRecipeCategories(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
