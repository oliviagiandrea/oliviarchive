'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { categories } from '../../scripts/categories';
import { ingredients } from '../../scripts/ingredients';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);  

  const updateSearchParams = (newParams: { [key: string]: string }) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateSearchParams({ title: term, page: '1' });
  }, 300);

  const handleCategoryChange = useDebouncedCallback((category: string) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((cat) => cat !== category) // Remove the category if already selected
        : [...prev, category]; // Add the category if not selected
        updateSearchParams({ categories: updatedCategories.join(','), page: '1' });
  
      return updatedCategories; 
    });
  }, 100);

  const handleIngredientChange = useDebouncedCallback((ingredient: string) => {
    setSelectedIngredients((prev) => {
      const updatedIngredients = prev.includes(ingredient)
        ? prev.filter((ing) => ing !== ingredient) // Remove the ingredient if already selected
        : [...prev, ingredient]; // Add the ingredient if not selected
        updateSearchParams({ ingredients: updatedIngredients.join(','), page: '1' });
  
      return updatedIngredients; 
    });
  }, 100);
  

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">Search</label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('title')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              value={category.id}
              checked={selectedCategories.includes(category.name)}
              onChange={() => handleCategoryChange(category.name)}
            />
            <span>{category.name}</span>
          </label>
        ))}
      </div>

      {/* Ingredients Filters */}
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient) => (
          <label key={ingredient.id} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              value={ingredient.id}
              checked={selectedIngredients.includes(ingredient.name)}
              onChange={() => handleIngredientChange(ingredient.name)}
            />
            <span>{ingredient.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
