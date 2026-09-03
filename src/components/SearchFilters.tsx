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
    <section>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="">All Categories</option>

        {categories.map((categoryName) => (
          <option key={categoryName} value={categoryName}>
            {categoryName}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(event) => setMinPrice(event.target.value)}
      />

      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(event) => setMaxPrice(event.target.value)}
      />

      <button type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </section>
  )
}