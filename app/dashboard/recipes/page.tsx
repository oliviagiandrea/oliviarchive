import Pagination from '@/app/ui/recipes/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/recipes/table';
import { CreateRecipe } from '@/app/ui/recipes/buttons';
import { lusitana } from '@/app/ui/fonts';
import { RecipesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchRecipesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recipes',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    categories?: string;
    ingredients?: string;
    page?: string;
  };
}) {
  const title = searchParams?.title || '';
  const categories = searchParams?.categories || '';
  const ingredients = searchParams?.ingredients || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchRecipesPages(title, categories, ingredients);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Recipes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search recipes..." />
        <CreateRecipe />
      </div>
      <Suspense key={title + currentPage} fallback={<RecipesTableSkeleton />}>
        <Table title={title} categories={categories} ingredients={ingredients} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
