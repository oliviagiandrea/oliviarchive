import { fetchIngredients } from '@/app/lib/data';
import Form from '@/app/ui/recipes/create-form';
import Breadcrumbs from '@/app/ui/recipes/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Recipe',
};

export default async function Page() {
  const ingredients = await fetchIngredients();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Recipes', href: '/dashboard/recipes' },
          {
            label: 'Create Recipe',
            href: '/dashboard/recipes/create',
            active: true,
          },
        ]}
      />
      <Form ingredients={ingredients} />
    </main>
  );
}
