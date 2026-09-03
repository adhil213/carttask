import { useProducts } from './hooks/useProduct'
import { useProductFilters } from './hooks/useProductFilters'
import { ProductGrid } from './components/ProductGrid'
import { SearchFilters } from './components/SearchFilters'
import { Cart } from './components/Cart'
import { Checkout } from './components/Checkout'
function App() {
  const { data, isPending, error } = useProducts()

  const products = data?.products ?? []

  const {
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
  } = useProductFilters(products)

  if (isPending) {
    return <p>Loading products...</p>
  }

  if (error || !data) {
    return <p>Failed to load products.</p>
  }

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ]

  return (
    <main>
      <h1>Shopping Cart</h1>

      <SearchFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        clearFilters={clearFilters}
        categories={categories}
      />

      <ProductGrid products={filteredProducts} />
      <h1>------------------------------------------</h1>
      <Cart/>
      <h1>------------------------------------------</h1>
      <Checkout />
    </main>
  )
}

export default App