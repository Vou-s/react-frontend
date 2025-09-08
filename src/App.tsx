import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import { CartProvider } from './context/CartContext'
import CartNotifier from './components/CartNotifer'
import { ToastContainer } from 'react-toastify'
import { useCart } from './context/CartContext'
import Penjualan from './pages/Penjualan'


function App() {
  const { add } = useCart();
  return (
    <CartProvider>
      <CartNotifier />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard addToCart={add} />} />
        <Route path="/penjualan" element={<Penjualan />} />
      </Routes>
    </CartProvider>
  )
}

export default App
