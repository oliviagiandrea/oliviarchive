'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { categories } from '../../scripts/categories';
import { ingredients } from '../../scripts/ingredients';
import { fromJSON } from 'postcss';

const categoryNames = categories.map((category) => category.name) as [string, ...string[]];
const ingredientNames = ingredients.map((ingredient) => ingredient.name) as [string, ...string[]];

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: 'Please enter a unique title.',
  }),
  notes: z.string({
    invalid_type_error: 'Please enter a note.',
  }),
  time: z.number({
    invalid_type_error: 'Please enter the number of minutes this recipe requires to prepare.',
  }),
  servings: z.number({
    invalid_type_error: 'Please enter the number of servings.',
  }),
  calories: z.number({
    invalid_type_error: 'Please enter the number of calories per serving.',
  }),
  categories: z.array(z.enum([...categoryNames] as [string, ...string[]]), {
    invalid_type_error: 'Please select at least one category.',
  })
  .nonempty('Please select at least one category.'),
  ingredients: z.record(z.string(), z.array(z.string().min(1)), {
    invalid_type_error: 'Please enter at least one ingredient.',
  }),
  directions: z.array(z.string(), {
    invalid_type_error: 'Please enter at least one step.',
  })
  .nonempty('Please enter at least one step.'),
  ingredients_list: z.array(z.enum([...ingredientNames] as [string, ...string[]]), {
    invalid_type_error: 'Please select at least one ingredient.',
  })
  .nonempty('Please select at least one ingredient.'),
});

const CreateRecipe = FormSchema.omit({ id: true, date: true });
const UpdateRecipe = FormSchema.omit({ date: true, id: true });

export type State = {
  errors?: {
    title?: string[];
    notes?: string[];
    time?: string[];
    servings?: string[];
    calories?: string[];
    categories?: string[];
    ingredients?: string[];
    directions?: string[];
    ingredients_list?: string[];
  };
  message?: string | null;
};

export async function createRecipe(prevState: State, formData: FormData) {
  const validatedFields = CreateRecipe.safeParse({
    title: formData.get('title'),
    notes: formData.get('notes'),
    time: Number(formData.get('time')),
    servings: Number(formData.get('servings')),
    calories: Number(formData.get('calories')),
    categories: formData.getAll('categories'),
    ingredients: JSON.parse(formData.get('ingredients') as string),
    directions: formData.getAll('directions'),
    ingredients_list: formData.getAll('ingredients_list'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Recipe.',
    };
  }

  const {
    title,
    notes,
    time,
    servings,
    calories,
    categories,
    ingredients,
    directions,
    ingredients_list,
  } = validatedFields.data;
  const date = new Date().toISOString();

  try {
    await sql`
      INSERT INTO recipes (title, notes, time, servings, calories, categories, ingredients, directions, ingredients_list, date)
      VALUES (
        ${title}, 
        ${notes}, 
        ${time}, 
        ${servings}, 
        ${calories}, 
        ${categories as unknown as string}::text[], 
        ${JSON.stringify(ingredients)}::jsonb,
        ${directions as unknown as string}::text[],
        ${ingredients_list as unknown as string}::text[], 
        ${date}
      )
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Recipe.',
    };
  }

  revalidatePath('/dashboard/recipes');
  redirect('/dashboard/recipes');
}

export async function updateRecipe(
  id: string,
  path: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateRecipe.safeParse({
    title: formData.get('title'),
    notes: formData.get('notes'),
    time: Number(formData.get('time')),
    servings: Number(formData.get('servings')),
    calories: Number(formData.get('calories')),
    categories: formData.getAll('categories'),
    ingredients: JSON.parse(formData.get('ingredients') as string),
    directions: formData.getAll('directions'),
    ingredients_list: formData.getAll('ingredients_list'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Recipe.',
    };
  }

  const {
    title,
    notes,
    time,
    servings,
    calories,
    categories,
    ingredients,
    directions,
    ingredients_list,
  } = validatedFields.data;
  const date = new Date().toISOString();

  try {
    await sql`
      UPDATE recipes
      SET title = ${title},
      notes = ${notes}, 
      time = ${time}, 
      servings = ${servings}, 
      calories = ${calories}, 
      categories = ${categories as unknown as string}::text[], 
      ingredients = ${JSON.stringify(ingredients)}::jsonb,
      directions = ${directions as unknown as string}::text[],
      ingredients_list = ${ingredients_list as unknown as string}::text[], 
      date = ${date}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Recipe.' };
  }

  revalidatePath(`/dashboard/recipes/${path}`);
  redirect(`/dashboard/recipes/${path}`);
}

export async function deleteRecipe(path: string) {
  try {
    await sql`DELETE FROM recipes WHERE path = ${path}`;
    revalidatePath('/dashboard/recipes');
    return { message: 'Deleted Recipe' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Recipe.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Database Error: Unable to Authenticate.';
      }
    }
    throw error;
  }
}
