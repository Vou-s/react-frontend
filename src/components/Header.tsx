import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

// Komponen UserMenu
function UserMenu() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    // simulasi proses logout (misal API call atau delay)
    setTimeout(() => {
      logout(); // hapus user + redirect
      setLoading(false);
    }, 500);
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Hi, {user.name || user.email}</span>
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`text-sm px-3 py-1 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

// Komponen Header
export default function Header() {
  const { items } = useCart();
  const { user } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg">POS App</Link>
          <Link to="/products" className="text-sm">Products</Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? <UserMenu /> : <Link to="/login" className="text-sm">Login</Link>}

          <Link to="/checkout" className="relative">
            <div className="p-2 border rounded">Cart</div>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
