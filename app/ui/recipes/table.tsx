import Image from 'next/image';
import Link from 'next/link';
import { UpdateRecipe, DeleteRecipe } from '@/app/ui/recipes/buttons';
import { fetchFilteredRecipes } from '@/app/lib/data';

export default async function RecipesTable({
  title,
  categories,
  ingredients,
  currentPage,
}: {
  title: string;
  categories: string;
  ingredients: string;
  currentPage: number;
}) {
  const recipes = await fetchFilteredRecipes(title, categories, ingredients, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {recipes?.map((recipe) => (
              <div
                key={recipe.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={`/recipes/${recipe.path}.jpg`}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${recipe.title}'s picture`}
                      />
                      <p>{recipe.title}</p>
                    </div>
                    {/* <p className="text-sm text-gray-500">{recipe.email}</p> */}
                  </div>
                  {/* <RecipeStatus status={recipe.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  {/* <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(recipe.amount)}
                    </p>
                    <p>{formatDateToLocal(recipe.date)}</p>
                  </div> */}
                  <div className="flex justify-end gap-2">
                    <UpdateRecipe id={recipe.id} />
                    <DeleteRecipe id={recipe.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Ingredient
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {recipes?.map((recipe) => (
                <tr
                  key={recipe.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={`/recipes/${recipe.path}.jpg`}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${recipe.title}'s picture`}
                      />
                      <Link href={`/dashboard/recipes/${recipe.path}`}>{recipe.title}</Link>
                    </div>
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {recipe.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(recipe.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(recipe.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <RecipeStatus status={recipe.status} />
                  </td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateRecipe id={recipe.id} />
                      <DeleteRecipe id={recipe.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
