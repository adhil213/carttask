import { useState } from 'react'
import {
  checkoutSchema,
  type CheckoutFormData,
} from '../schemas/checkoutSchema'

export function Checkout() {
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

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
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
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <section>
        <h2>Order Placed Successfully</h2>
        <p>Thank you for your order.</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>

          <input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          {errors.fullName && <p>{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="address">Address</label>

          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          {errors.address && <p>{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="city">City</label>

          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          {errors.city && <p>{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code</label>

          <input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />

          {errors.postalCode && <p>{errors.postalCode}</p>}
        </div>

        <button type="submit">
          Place Order
        </button>
      </form>
    </section>
  )
}