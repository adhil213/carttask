import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { checkoutSchema, type CheckoutFormData } from '../schemas/checkoutSchema'
import { useCartStore } from '../store/cartStore'

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const fieldClass = (hasError: boolean) =>
  `w-full rounded-md border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none ${
    hasError
      ? 'border-red-400 focus:border-red-500'
      : 'border-stone-300 focus:border-indigo-600'
  }`

interface CheckoutFieldProps {
  label: string
  name: keyof CheckoutFormData
  value: string
  error?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
}

function CheckoutField({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
}: CheckoutFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-xs font-medium text-stone-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldClass(Boolean(error))}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export function Checkout() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({})

  const [isSuccess, setIsSuccess] = useState(false)

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    if (errors[name as keyof CheckoutFormData]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = checkoutSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof CheckoutFormData, string>
      > = {}

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof CheckoutFormData

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      })

      setErrors(fieldErrors)
      return
    }

    setErrors({})
    clearCart()
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <section className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-stone-200 bg-white px-6 py-14 text-center">
          <CheckCircle2
            className="mx-auto h-10 w-10 text-green-600"
            aria-hidden="true"
          />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">
            Order Placed Successfully
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">
            Thank you for your order, {formData.fullName}. A confirmation has
            been sent to {formData.email}.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Cart
        </Link>
      </div>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">
        Checkout
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-lg border border-stone-200 bg-white p-5 sm:p-6 lg:col-span-2"
        >
          <h2 className="text-sm font-semibold text-stone-900">
            Contact &amp; Shipping
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CheckoutField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              error={errors.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
            />

            <CheckoutField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="jane@example.com"
            />

            <div className="sm:col-span-2">
              <CheckoutField
                label="Address"
                name="address"
                value={formData.address}
                error={errors.address}
                onChange={handleChange}
                placeholder="123 Market Street"
              />
            </div>

            <CheckoutField
              label="City"
              name="city"
              value={formData.city}
              error={errors.city}
              onChange={handleChange}
              placeholder="San Francisco"
            />

            <CheckoutField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              error={errors.postalCode}
              onChange={handleChange}
              placeholder="94103"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 active:bg-stone-800 sm:w-auto sm:px-6"
          >
            Place Order
          </button>
        </form>

        <aside className="h-fit rounded-lg border border-stone-200 bg-white p-5 lg:sticky lg:top-20">
          <h2 className="text-sm font-semibold text-stone-900">
            Order Summary
          </h2>

          <ul className="mt-4 divide-y divide-stone-200">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-3 py-3">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="h-12 w-12 shrink-0 rounded-md bg-stone-100 object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <span className="line-clamp-1 text-sm text-stone-900">
                    {item.product.title}
                  </span>
                  <span className="text-xs text-stone-500">
                    {item.quantity} &times; {formatPrice(item.product.price)}
                  </span>
                </div>
                <span className="text-sm font-medium text-stone-900">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-stone-200" />

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Subtotal ({itemCount} item{itemCount === 1 ? '' : 's'})</dt>
              <dd className="font-medium text-stone-900">
                {formatPrice(subtotal)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex justify-between border-t border-stone-200 pt-4">
            <span className="font-semibold text-stone-900">Total</span>
            <span className="font-semibold text-stone-900">
              {formatPrice(subtotal)}
            </span>
          </div>
        </aside>
      </div>

      {items.length === 0 && (
        <p className="mt-6 text-sm text-stone-500">
          Your cart is empty.{' '}
          <Link to="/" className="font-medium text-indigo-700 hover:underline">
            Continue shopping
          </Link>
          .
        </p>
      )}
    </section>
  )
}