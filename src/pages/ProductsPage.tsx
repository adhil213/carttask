import { useProducts } from '../hooks/useProduct'
import { useProductFilters } from '../hooks/useProductFilters'
import { SearchFilters } from '../components/SearchFilters'
import { ProductGrid } from '../components/ProductGrid'

export function ProductsPage() {
  const { data, isPending, error, refetch } = useProducts()

  const products = data?.products ?? []

  const {
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
    clearFilters,
  } = useProductFilters(products)

  const hasActiveFilters = Boolean(
    search || category || minPrice || maxPrice,
  )

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square animate-pulse rounded-lg bg-stone-200"
              />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (error || !data) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-stone-200 bg-white px-6 py-16 text-center">
          <h1 className="text-xl font-semibold text-stone-900">
            Products are unavailable
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">
            We couldn't load the product catalogue. Please try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ]

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          All Products
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Browse our catalogue and add your favourites to the cart.
        </p>
      </section>

      <SearchFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        clearFilters={clearFilters}
        categories={categories}
      />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-stone-500">
          {filteredProducts.length} product
          {filteredProducts.length === 1 ? '' : 's'}
        </p>
      </div>

      <div className="mt-4">
        <ProductGrid
          products={filteredProducts}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
    </main>
  )
}