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
    title?: string;
    page?: string;
  };
}) {
  const title = searchParams?.title || '';

  const categories = await fetchFilteredCategories(title);

  return (
    <main>
      <CategoriesTable categories={categories} />
    </main>
  );
}
