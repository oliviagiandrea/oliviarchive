import Form from '@/app/ui/recipes/edit-form';
import Breadcrumbs from '@/app/ui/recipes/breadcrumbs';
import { fetchRecipeByPath, fetchIngredients } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Recipe',
};

export default async function Page({ params }: { params: { path: string } }) {
  const path = params.path;
  const [recipe] = await Promise.all([
    fetchRecipeByPath(path),
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
            href: `/dashboard/recipes/${path}/edit`,
            active: true,
          },
        ]}
      />
      <Form recipe={recipe} />
    </main>
  );
}
