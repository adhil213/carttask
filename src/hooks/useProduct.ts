import { useQuery } from '@tanstack/react-query'
import { productsResponseSchema } from '../schemas/productSchema'

const PRODUCTS_URL = 'https://dummyjson.com/products'

async function fetchProducts() {
  const response = await fetch(PRODUCTS_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data: unknown = await response.json()
  return productsResponseSchema.parse(data)
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}