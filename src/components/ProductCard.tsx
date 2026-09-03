import type { Product } from '../schemas/productSchema'
import { useCartStore } from '../store/cartStore'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <article>
      <img
        src={product.thumbnail}
        alt={product.title}
      />

      <h2>{product.title}</h2>

      <p>{product.category}</p>

      <p>${product.price}</p>

      <p>Rating: {product.rating}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </article>
  )
}