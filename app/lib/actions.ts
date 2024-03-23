'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  ingredientId: z.string({
    invalid_type_error: 'Please select a ingredient.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an recipe status.',
  }),
  date: z.string(),
});

const CreateRecipe = FormSchema.omit({ id: true, date: true });
const UpdateRecipe = FormSchema.omit({ date: true, id: true });

export type State = {
  errors?: {
    ingredientId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createRecipe(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateRecipe.safeParse({
    ingredientId: formData.get('ingredientId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Recipe.',
    };
  }

  // Prepare data for insertion into the database
  const { ingredientId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO recipes (ingredient_id, amount, status, date)
      VALUES (${ingredientId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Recipe.',
    };
  }

  // Revalidate the cache for the recipes page and redirect the user.
  revalidatePath('/dashboard/recipes');
  redirect('/dashboard/recipes');
}

export async function updateRecipe(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateRecipe.safeParse({
    ingredientId: formData.get('ingredientId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Recipe.',
    };
  }

  const { ingredientId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE recipes
      SET ingredient_id = ${ingredientId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Recipe.' };
  }

  revalidatePath('/dashboard/recipes');
  redirect('/dashboard/recipes');
}

export async function deleteRecipe(id: string) {
  try {
    await sql`DELETE FROM recipes WHERE id = ${id}`;
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
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
