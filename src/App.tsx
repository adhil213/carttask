import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { Cart } from './components/Cart'
import { Checkout } from './components/Checkout'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<ProductsPage />} />
      </Routes>
    </div>
  )
}

export default App