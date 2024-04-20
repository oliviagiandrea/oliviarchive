import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestRecipes from '@/app/ui/dashboard/latest-recipes';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestRecipesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 grid-cols-3">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6">
        {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"> */}
        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense> */}
        <Suspense fallback={<LatestRecipesSkeleton />}>
          <LatestRecipes />
        </Suspense>
      </div>
    </main>
  );
}
