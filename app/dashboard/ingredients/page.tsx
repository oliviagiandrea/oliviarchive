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
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  const ingredients = await fetchFilteredIngredients(query);

  return (
    <main>
      <IngredientsTable ingredients={ingredients} />
    </main>
  );
}
