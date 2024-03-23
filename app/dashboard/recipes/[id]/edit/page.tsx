import Form from '@/app/ui/recipes/edit-form';
import Breadcrumbs from '@/app/ui/recipes/breadcrumbs';
import { fetchRecipeById, fetchIngredients } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Recipe',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [recipe, ingredients] = await Promise.all([
    fetchRecipeById(id),
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
            label: 'Edit Recipe',
            href: `/dashboard/recipes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form recipe={recipe} ingredients={ingredients} />
    </main>
  );
}
