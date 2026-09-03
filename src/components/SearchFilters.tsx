import { Search, SlidersHorizontal } from 'lucide-react'

interface SearchFiltersProps {
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (value: string) => void
  minPrice: string
  setMinPrice: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
  clearFilters: () => void
  categories: string[]
}

const inputClass =
  'w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:border-indigo-600 focus:outline-none'

export function SearchFilters({
  search,
  setSearch,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
  categories,
}: SearchFiltersProps) {
  return (
    <section
      className="border-b border-stone-200 pb-6"
      aria-label="Product filters"
    >
      <div className="flex items-center gap-2">
        <SlidersHorizontal
          className="h-4 w-4 text-stone-400"
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold text-stone-900">
          Filter products
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="relative md:col-span-6 lg:col-span-5">
          <label
            htmlFor="search"
            className="mb-1 block text-xs font-medium text-stone-700"
          >
            Search
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              id="search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-2">
          <label
            htmlFor="category"
            className="mb-1 block text-xs font-medium text-stone-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputClass}
          >
            <option value="">All Categories</option>
            {categories.map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-2 lg:col-span-4">
          <div>
            <label
              htmlFor="minPrice"
              className="mb-1 block text-xs font-medium text-stone-700"
            >
              Min Price
            </label>
            <input
              id="minPrice"
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="No min"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="maxPrice"
              className="mb-1 block text-xs font-medium text-stone-700"
            >
              Max Price
            </label>
            <input
              id="maxPrice"
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="No max"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-end md:col-span-2">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 md:w-auto"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>
  )
}