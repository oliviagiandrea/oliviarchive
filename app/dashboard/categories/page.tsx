import { fetchFilteredCategories } from '@/app/lib/data';
import CategoriesTable from '@/app/ui/categories/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
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

  const categories = await fetchFilteredCategories(query);

  return (
    <main>
      <CategoriesTable categories={categories} />
    </main>
  );
}
