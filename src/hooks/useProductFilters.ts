import { useMemo, useState } from 'react'
import type { Product } from '../schemas/productSchema'

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesCategory =
        category === '' || product.category === category

      const matchesMinPrice =
        minPrice === '' || product.price >= Number(minPrice)

      const matchesMaxPrice =
        maxPrice === '' || product.price <= Number(maxPrice)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    })
  }, [products, search, category, minPrice, maxPrice])

  function clearFilters() {
    setSearch('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
    clearFilters,
  }
}