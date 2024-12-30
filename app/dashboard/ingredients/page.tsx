import { fetchFilteredIngredients } from '@/app/lib/data';
import IngredientsTable from '@/app/ui/ingredients/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ingredients',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    page?: string;
  };
}) {
  const title = searchParams?.title || '';

  const ingredients = await fetchFilteredIngredients(title);

  return (
    <main>
      <IngredientsTable ingredients={ingredients} />
    </main>
  );
}
