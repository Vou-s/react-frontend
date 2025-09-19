import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Category {
  id: number;
  name: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  subcategory_id?: number;
  image_url?: string;
}

export default function Home() {
  const { items: cartItems, add } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // ===== FETCH DATA =====
  const fetchCategories = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_API_URL}/categories`);
      const data = res.data?.data || res.data || [];
      setCategories(data.map((cat: any) => ({ ...cat, subcategories: cat.subcategories || [] })));
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };


  const fetchProducts = async (categoryId?: number, subcategoryId?: number) => {
    try {
      const params: any = {};
      if (subcategoryId) params.subcategory_id = subcategoryId;
      else if (categoryId) params.category_id = categoryId;

      const res = await api.get(`${apiUrl}/products`, { params });
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  // ===== CATEGORY SELECTION =====
  const toggleCategory = (catId: number) => {
    setOpenCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
    setSelectedCategory(catId);
    setSelectedSubcategory(null);
    fetchProducts(catId);
  };

  const selectSubcategory = (catId: number, subId: number) => {
    setSelectedCategory(catId);
    setSelectedSubcategory(subId);
    fetchProducts(undefined, subId);
  };

  const selectAll = () => {
    setSelectedCategory("all");
    setSelectedSubcategory(null);
    fetchProducts();
  };

  const handleAddToCart = (product: Product) => {
    add({ product_id: product.id, name: product.name, price: product.price, quantity: 1 });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart kosong! Silakan tambahkan produk terlebih dahulu.");
      return;
    }
    navigate("/checkout");
  };

  // ===== EFFECTS =====
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory === "all" ? undefined : selectedCategory as number, selectedSubcategory || undefined);
  }, [selectedCategory, selectedSubcategory]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="bg-blue-500 text-black text-center py-12 text-2xl font-bold">
        Banner Promo / Slider Produk
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white p-6 shadow h-screen sticky top-0 overflow-y-auto">
          <h2 className="font-bold mb-4">Katalog</h2>

          <div
            onClick={selectAll}
            className={`cursor-pointer px-2 py-1 rounded mb-2 hover:bg-yellow-100 transition ${selectedCategory === "all" ? "bg-yellow-200 font-bold" : ""}`}
          >
            Semua Produk
          </div>

          <ul className="space-y-2">
            {categories.map((cat) => {
              const isOpen = openCategories[cat.id] || false;
              return (
                <li key={cat.id}>
                  <div
                    onClick={() => toggleCategory(cat.id)}
                    className={`cursor-pointer px-2 py-1 rounded hover:bg-yellow-100 transition flex justify-between items-center ${selectedCategory === cat.id && !selectedSubcategory ? "bg-yellow-200 font-bold" : ""}`}
                  >
                    {cat.name}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <span className="ml-2 text-xs text-gray-500">{isOpen ? "−" : "+"}</span>
                    )}
                  </div>

                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-1" : "max-h-0"}`}>
                      <ul className="ml-4 space-y-1">
                        {cat.subcategories.map((sub) => (
                          <li
                            key={sub.id}
                            onClick={() => selectSubcategory(cat.id, sub.id)}
                            className={`cursor-pointer px-2 py-1 rounded hover:bg-yellow-100 transition ${selectedSubcategory === sub.id ? "bg-yellow-200 font-bold" : ""}`}
                          >
                            {sub.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Produk */}
        <main className="w-3/4 p-6">
          <h2 className="text-xl font-bold mb-4">
            {selectedSubcategory
              ? `Produk Subkategori`
              : selectedCategory === "all"
                ? "Semua Produk"
                : `Produk Kategori`}
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-500">Produk belum tersedia...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-4 shadow hover:scale-105 transition relative">
                  <div className="bg-gray-200 h-32 rounded mb-2 flex items-center justify-center overflow-hidden relative group">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="object-cover h-full w-full" />
                    ) : (
                      <span className="text-gray-500 text-sm">No Image</span>
                    )}

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition rounded"
                    >
                      <ShoppingCartIcon className="h-8 w-8 text-white" />
                    </button>
                  </div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">Rp {product.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Cart */}
      <button
        className={`fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:bg-yellow-400 ${cartItems.length === 0 ? "opacity-50 cursor-not-allowed hover:bg-yellow-500" : ""
          }`}
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        🛒
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>
    </div>
  );
}
