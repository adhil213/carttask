import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Trash2 } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function Cart() {
  const items = useCartStore((state) => state.items)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const navigate = useNavigate()

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  if (items.length === 0) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Your Cart
        </h1>
        <div className="mt-6 rounded-lg border border-stone-200 bg-white px-6 py-16 text-center">
          <h2 className="text-base font-medium text-stone-900">
            Your cart is empty
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-stone-500">
            Browse the catalogue and add a few items before checking out.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Your Cart
        </h1>
        <span className="text-sm text-stone-500">
          {itemCount} item{itemCount === 1 ? '' : 's'}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-4 p-4 sm:p-5">
                <Link
                  to={`/product/${item.product.id}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-stone-100"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="line-clamp-2 text-sm font-medium text-stone-900 hover:text-indigo-700"
                    >
                      {item.product.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md p-1 text-stone-400 transition-colors hover:text-red-600"
                      aria-label={`Remove ${item.product.title} from cart`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center rounded-md border border-stone-200">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="h-9 w-9 text-lg font-medium text-stone-700 transition-colors hover:bg-stone-100"
                        aria-label={`Decrease quantity of ${item.product.title}`}
                      >
                        &minus;
                      </button>
                      <span
                        className="min-w-10 text-center text-sm font-medium text-stone-900"
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.product.id)}
                        className="h-9 w-9 text-lg font-medium text-stone-700 transition-colors hover:bg-stone-100"
                        aria-label={`Increase quantity of ${item.product.title}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-stone-400">
                        {formatPrice(item.product.price)} each
                      </p>
                      <p className="text-sm font-semibold text-stone-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={clearCart}
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-500 transition-colors hover:text-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-stone-200 bg-white p-5 lg:sticky lg:top-20">
          <h2 className="text-sm font-semibold text-stone-900">
            Order Summary
          </h2>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Subtotal</dt>
              <dd className="font-medium text-stone-900">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Shipping</dt>
              <dd className="text-stone-500">Calculated at checkout</dd>
            </div>
          </dl>

          <div className="my-4 border-t border-stone-200" />

          <div className="flex justify-between text-base">
            <span className="font-semibold text-stone-900">Total</span>
            <span className="font-semibold text-stone-900">
              {formatPrice(subtotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 active:bg-stone-800"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </aside>
      </div>
    </section>
  )
}