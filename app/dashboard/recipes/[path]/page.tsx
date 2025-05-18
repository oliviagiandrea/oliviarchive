import Form from '@/app/ui/recipes/edit-form';
import Breadcrumbs from '@/app/ui/recipes/breadcrumbs';
import { fetchRecipeByPath, fetchIngredients } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Edit Recipe',
// };

export default async function Page({ params }: { params: { path: string } }) {
  const path = params.path;
  const [recipe, ingredients] = await Promise.all([
    fetchRecipeByPath(path),
    fetchIngredients(),
  ]);

  if (!recipe) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Recipes', href: '/dashboard/recipes' },
          {
            label: `${recipe.title}`,
            href: `/dashboard/recipes/${path}`,
            active: true,
          },
        ]}
      />
      <Image
        src={`/recipes/${recipe.path}.jpg`}
        alt={`${recipe.title}'s picture`}
        className="mr-4"
        width={320}
        height={320}
      />
      <h1>{recipe.title}</h1>
      <p>{recipe.notes}</p>
      <p>
        {recipe.date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p>
        {recipe.time} minutes, {recipe.calories} calories, serves{' '}
        {recipe.servings}
      </p>
      <h2>Ingredients</h2>
      {Object.entries(recipe.ingredients).map(([category, items]) => (
        <div key={category}>
          {category !== 'Ingredients' && <h3>{category}</h3>}
          <ul>
            {items.map((item, index) => (
              <li key={`ingredient-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Directions</h2>
      <ol>
        {recipe.directions.map((direction, index) => (
          <li key={`direction-${index}`}>{direction}</li>
        ))}
      </ol>
    </main>
  );
}
