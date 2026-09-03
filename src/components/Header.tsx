import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export function Header() {
  const items = useCartStore((state) => state.items)

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-stone-900"
          >
            codenzicShop
          </Link>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-sm font-medium text-stone-900 underline underline-offset-4'
                : 'text-sm font-medium text-stone-500 transition-colors hover:text-stone-900'
            }
          >
            All Products
          </NavLink>
        </div>

        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
          aria-label={`Cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          <span>Cart</span>
          <span
            className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-stone-900 px-1.5 py-0.5 text-xs font-semibold text-white"
            aria-hidden="true"
          >
            {cartCount}
          </span>
        </Link>
      </div>
    </header>
  )
}