import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import type { Product } from '../schemas/productSchema'
import { useCartStore } from '../store/cartStore'

interface ProductCardProps {
  product: Product
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow duration-200 hover:shadow-sm">
      <Link
        to={`/product/${product.id}`}
        className="aspect-square overflow-hidden bg-stone-100"
        aria-label={product.title}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
          {product.category}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-sm font-medium leading-snug text-stone-900 hover:text-indigo-700"
        >
          {product.title}
        </Link>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-base font-semibold text-stone-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <div
            className="flex items-center gap-1 text-xs text-stone-500"
            aria-label={`Rating ${product.rating} out of 5`}
          >
            <Star
              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-md bg-stone-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700 active:bg-stone-800"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </article>
  )
}