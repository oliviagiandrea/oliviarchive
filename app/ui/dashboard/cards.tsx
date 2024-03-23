import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  ingredients: UserGroupIcon,
  pending: ClockIcon,
  recipes: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfRecipes,
    numberOfIngredients,
    totalPaidRecipes,
    totalPendingRecipes,
  } = await fetchCardData();

  return (
    <>
      {/* <Card title="Collected" value={totalPaidRecipes} type="collected" />
      <Card title="Pending" value={totalPendingRecipes} type="pending" /> */}
      <Card title="Total Recipes" value={numberOfRecipes} type="recipes" />
      <Card
        title="Total Ingredients"
        value={numberOfIngredients}
        type="ingredients"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'recipes' | 'ingredients' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
