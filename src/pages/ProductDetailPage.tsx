import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react'
import { useProducts } from '../hooks/useProduct'
import { useCartStore } from '../store/cartStore'

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)

  const { data, isPending, error } = useProducts()
  const addToCart = useCartStore((state) => state.addToCart)

  const [selectedImage, setSelectedImage] = useState(0)

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-8 w-40 animate-pulse rounded bg-stone-200" />
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-lg bg-stone-200" />
          <div className="space-y-4">
            <div className="h-6 w-3/4 animate-pulse rounded bg-stone-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200" />
            <div className="h-10 w-40 animate-pulse rounded bg-stone-200" />
            <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-stone-200" />
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
            Product is unavailable
          </h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Back to All Products
          </Link>
        </div>
      </main>
    )
  }

  const product = data.products.find((item) => item.id === productId)

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-stone-200 bg-white px-6 py-16 text-center">
          <h1 className="text-xl font-semibold text-stone-900">
            Product not found
          </h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Back to All Products
          </Link>
        </div>
      </main>
    )
  }

  const images =
    product.images.length > 0 ? product.images : [product.thumbnail]
  const activeImage =
    selectedImage < images.length
      ? images[selectedImage]
      : product.thumbnail

  const inStock = product.stock > 0

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to All Products
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
            <img
              src={activeImage}
              alt={product.title}
              className="aspect-square w-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <div
              className="mt-4 flex gap-3"
              role="group"
              aria-label="Product images"
            >
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={index === selectedImage}
                  className={`h-20 w-20 overflow-hidden rounded-md border bg-white transition-colors ${
                    index === selectedImage
                      ? 'border-indigo-600'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
            {product.category}
          </span>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-sm font-medium text-amber-700"
            >
              <Star
                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              {product.rating.toFixed(1)}
            </span>
            <span className="sr-only">out of 5</span>
            <span
              className={`text-sm ${inStock ? 'text-green-700' : 'text-red-600'}`}
            >
              {inStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          <p className="mt-4 text-3xl font-semibold tracking-tight text-stone-900">
            {formatPrice(product.price)}
          </p>

          <p className="mt-4 leading-relaxed text-stone-600">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => addToCart(product)}
              disabled={!inStock}
              className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 active:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Add to Cart
            </button>

            {!inStock && (
              <span className="text-sm text-stone-500">
                This item is currently unavailable.
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}