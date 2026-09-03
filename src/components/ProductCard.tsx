import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, ShoppingCart, Star, X } from 'lucide-react'
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
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    if (!previewOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [previewOpen])

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md">
        <div className="relative">
          <Link
            to={`/product/${product.id}`}
            className="block aspect-square overflow-hidden bg-stone-100"
            aria-label={product.title}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-stone-200 bg-white/95 px-2.5 py-1.5 text-xs font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-900 hover:text-white"
            aria-label={`Quick preview ${product.title}`}
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Preview
          </button>
        </div>

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
            <span className="text-base font-semibold text-stone-900">
              {formatPrice(product.price)}
            </span>

            <span
              className="inline-flex items-center gap-1 text-xs text-stone-500"
              aria-label={`Rating ${product.rating} out of 5`}
            >
              <Star
                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              {product.rating.toFixed(1)}
            </span>
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

      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="grid w-full max-w-2xl grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl sm:grid-cols-2"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative bg-stone-100">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-contain sm:aspect-square"
              />
            </div>

            <div className="flex flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
                  {product.category}
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewOpen(false)}
                  className="inline-flex shrink-0 items-center justify-center rounded-md p-1 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <h2 className="mt-2 text-lg font-semibold leading-snug text-stone-900">
                {product.title}
              </h2>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700"
                >
                  <Star
                    className="h-3 w-3 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-stone-400">out of 5</span>
              </div>

              <p className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
                {formatPrice(product.price)}
              </p>

              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-stone-600">
                {product.description}
              </p>

              <div className="mt-auto flex flex-col gap-2 pt-5">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 active:bg-stone-800"
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => setPreviewOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}