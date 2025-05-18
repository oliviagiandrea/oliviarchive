'use client';

import { IngredientField, RecipeForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateRecipe } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

import { categories } from '../../../scripts/categories';

export default function EditRecipeForm({
  recipe,
  ingredients,
}: {
  recipe: RecipeForm;
  ingredients: IngredientField[];
}) {
  const initialState = { message: null, errors: {} };
  const updateRecipeWithId = updateRecipe.bind(
    null,
    recipe.id.toString(),
    recipe.path,
  );
  const [state, dispatch] = useFormState(updateRecipeWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={recipe.title}
              aria-describedby="title-error"
            />
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="mb-2 block text-sm font-medium">
            Notes
          </label>
          <div className="relative">
            <input
              id="notes"
              name="notes"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={recipe.notes}
              aria-describedby="notes-error"
            />
          </div>
          <div id="notes-error" aria-live="polite" aria-atomic="true">
            {state.errors?.notes &&
              state.errors.notes.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="mb-2 block text-sm font-medium">
            Time
          </label>
          <div className="relative">
            <input
              id="time"
              name="time"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={recipe.time}
              aria-describedby="time-error"
            />
          </div>
          <div id="time-error" aria-live="polite" aria-atomic="true">
            {state.errors?.time &&
              state.errors.time.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="servings" className="mb-2 block text-sm font-medium">
            Servings
          </label>
          <div className="relative">
            <input
              id="servings"
              name="servings"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={recipe.servings}
              aria-describedby="servings-error"
            />
          </div>
          <div id="servings-error" aria-live="polite" aria-atomic="true">
            {state.errors?.servings &&
              state.errors.servings.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="calories" className="mb-2 block text-sm font-medium">
            Calories
          </label>
          <div className="relative">
            <input
              id="calories"
              name="calories"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={recipe.calories}
              aria-describedby="calories-error"
            />
          </div>
          <div id="calories-error" aria-live="polite" aria-atomic="true">
            {state.errors?.calories &&
              state.errors.calories.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="categories"
            className="mb-2 block text-sm font-medium"
          >
            Categories
          </label>
          <div className="relative">
            {categories.map((category) => (
              <div key={category.name}>
                <input
                  type="checkbox"
                  id={category.name}
                  name="categories"
                  key={category.name}
                  value={category.name}
                  defaultChecked={recipe.categories.includes(category.name)}
                />
                <label htmlFor={category.name}> {category.name}</label>
                <br />
              </div>
            ))}
          </div>
          <div id="categories-error" aria-live="polite" aria-atomic="true">
            {state.errors?.categories &&
              state.errors.categories.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="mb-2 block text-sm font-medium"
          >
            Ingredients
          </label>
          <div className="relative">
            {recipe.ingredients.map((ingredient) => (
              <div key={ingredient.name}>
                <input
                  type="checkbox"
                  id={ingredient.name}
                  name="ingredients_list"
                  key={ingredient.name}
                  value={ingredient.name}
                  defaultChecked={recipe.ingredients_list.includes(
                    ingredient.name,
                  )}
                />
                <input
                  id="ingredients"
                  name="ingredients"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue={recipe.ingredients}
                  aria-describedby="ingredients-error"
                />
                <label htmlFor={ingredient.name}> {ingredient.name}</label>
                <br />
              </div>
            ))}
          </div>
          <div id="ingredients-error" aria-live="polite" aria-atomic="true">
            {state.errors?.ingredients &&
              state.errors.ingredients.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="directions"
            className="mb-2 block text-sm font-medium"
          >
            Directions
          </label>
          <div className="relative">
            <ol>
              {recipe.directions.map((direction, index) => (
                <li key={`direction-${index}`}>
                  <label htmlFor={`direction-${index}`}>
                    Step {index + 1}:{' '}
                  </label>
                  <textarea
                    id={`direction-${index}`}
                    name="directions"
                    defaultValue={direction}
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="directions-error"
                  />
                </li>
              ))}
            </ol>
          </div>
          <div id="directions-error" aria-live="polite" aria-atomic="true">
            {state.errors?.directions &&
              state.errors.directions.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* path */}

        <div className="mb-4">
          <label
            htmlFor="ingredients_list"
            className="mb-2 block text-sm font-medium"
          >
            Ingredients List
          </label>
          <div className="relative">
            {ingredients.map((ingredient) => (
              <div key={ingredient.name}>
                <input
                  type="checkbox"
                  id={ingredient.name}
                  name="ingredients_list"
                  key={ingredient.name}
                  value={ingredient.name}
                  defaultChecked={recipe.ingredients_list.includes(
                    ingredient.name,
                  )}
                />
                <label htmlFor={ingredient.name}> {ingredient.name}</label>
                <br />
              </div>
            ))}
          </div>
          <div
            id="ingredients_list-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.ingredients_list &&
              state.errors.ingredients_list.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Ingredient Name */}
        {/* <div className="mb-4">
          <label htmlFor="ingredient" className="mb-2 block text-sm font-medium">
            Choose ingredient
          </label>
          <div className="relative">
            <select
              id="ingredient"
              name="ingredientId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={recipe.ingredient_id}
              aria-describedby="ingredient-error"
            >
              <option value="" disabled>
                Select a ingredient
              </option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="ingredient-error" aria-live="polite" aria-atomic="true">
            {state.errors?.ingredientId &&
              state.errors.ingredientId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> */}

        {/* Recipe Amount */}
        {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                defaultValue={recipe.amount}
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> */}

        {/* Recipe Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the recipe status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={recipe.status === 'pending'}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={recipe.status === 'paid'}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset> */}

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/recipes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
