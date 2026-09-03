import { useCartStore } from '../store/cartStore'

export function Cart() {
  const items = useCartStore((state) => state.items)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  if (items.length === 0) {
    return (
      <section>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Your Cart</h2>

      {items.map((item) => (
        <article key={item.product.id}>
          <img
            src={item.product.thumbnail}
            alt={item.product.title}
          />

          <h3>{item.product.title}</h3>

          <p>${item.product.price}</p>

          <div>
            <button
              type="button"
              onClick={() => decreaseQuantity(item.product.id)}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.product.id)}
            >
              +
            </button>
          </div>

          <p>
            Item total: $
            {(item.product.price * item.quantity).toFixed(2)}
          </p>

          <button
            type="button"
            onClick={() => removeFromCart(item.product.id)}
          >
            Remove
          </button>
        </article>
      ))}

      <p>Subtotal: ${subtotal.toFixed(2)}</p>

      <button type="button" onClick={clearCart}>
        Clear Cart
      </button>
    </section>
  )
}