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
import { useState } from 'react';

import { categories } from '../../../scripts/categories';
import { ingredients } from '../../../scripts/ingredients';

export default function EditRecipeForm({ recipe }: { recipe: RecipeForm }) {
  const initialState = { message: null, errors: {} };
  const updateRecipeWithId = updateRecipe.bind(
    null,
    recipe.id.toString(),
    recipe.path,
  );
  const [state, dispatch] = useFormState(updateRecipeWithId, initialState);
  const [recipeIngredients, setRecipeIngredients] = useState<{
    [category: string]: string[];
  }>(recipe.ingredients);

  function handleAddCategory() {
    const name = prompt('Enter a new category:');
    if (name && !recipeIngredients[name]) {
      setRecipeIngredients((prev) => ({ ...prev, [name]: [''] }));
    }
  }

  function handleRemoveCategory(name: string) {
    const updated = { ...recipeIngredients };
    delete updated[name];
    setRecipeIngredients(updated);
  }

  function handleAddIngredient(category: string) {
    setRecipeIngredients((prev) => ({
      ...prev,
      [category]: [...prev[category], ''],
    }));
  }

  function handleRemoveIngredient(category: string, index: number) {
    setRecipeIngredients((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  }

  function handleIngredientChange(
    category: string,
    index: number,
    value: string,
  ) {
    setRecipeIngredients((prev) => ({
      ...prev,
      [category]: prev[category].map((item, i) => (i === index ? value : item)),
    }));
  }

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
          <div className="relative" aria-describedby="categories-error">
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

        <button
          type="button"
          onClick={handleAddCategory}
          className="font-medium text-blue-600"
        >
          + Add Category
        </button>

        {Object.entries(recipeIngredients).map(([category, items]) => (
          <div key={category} className="mb-4 border p-2">
            <div className="flex items-center justify-between">
              <label className="text-md font-semibold">{category}</label>
              <button
                type="button"
                onClick={() => handleRemoveCategory(category)}
                className="text-sm text-red-500"
              >
                Remove Category
              </button>
            </div>

            {items.map((ingredient, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <input
                  type="text"
                  name={`ingredients-${category}`}
                  defaultValue={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(category, index, e.target.value)
                  }
                  className="w-full rounded border p-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(category, index)}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleAddIngredient(category)}
              className="text-sm text-blue-500"
            >
              + Add Ingredient
            </button>
          </div>
        ))}
        <input
          type="hidden"
          name="ingredients"
          value={JSON.stringify(recipeIngredients)}
          aria-describedby="ingredients-error"
        />
        <div id="ingredients-error" aria-live="polite" aria-atomic="true">
          {state.errors?.ingredients &&
            state.errors.ingredients.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

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
