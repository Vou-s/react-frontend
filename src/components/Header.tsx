import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
    }, 500);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-lg">
            Vourse Shop
          </Link>

          {/* Main nav */}
          <nav className="hidden md:flex gap-4 text-sm">
            {/* <Link to="/products" className="hover:text-blue-500">
              Trending
            </Link> */}
            <Link to="/HistoryCheckout" className="hover:text-blue-500">
              History
            </Link>
            <span className="text-gray-400">Reports</span>
          </nav>
        </div>

        {/* Right: User + Cart */}
        <div className="flex items-center gap-4 relative">
          {/* Cart */}
          <Link to="/checkout" className="relative">
            <div className="p-2 border rounded hover:bg-gray-100">🛒</div>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {items.length}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="relative">
              {/* Avatar button */}
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 focus:outline-none"
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Hi, {user.name || user.email}
                  </div>
                  <Link
                    to="/HistoryCheckout"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    History Checkout
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      loading
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-500 hover:bg-gray-100"
                    }`}
                  >
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
