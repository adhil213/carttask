import type { Product } from '../schemas/productSchema'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function ProductGrid({
  products,
  onClearFilters,
  hasActiveFilters,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
        <h2 className="text-base font-medium text-stone-900">
          No products match your filters
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          Try adjusting your search or price range.
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-4 inline-flex items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
          >
            Clear Filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}