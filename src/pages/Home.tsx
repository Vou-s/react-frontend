import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import api from "../services/api";

/* -------------------- Interfaces -------------------- */
interface Category {
  id: number;
  name: string;
  subcategories?: Category[];
}
interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  image_url?: string;
}
interface Toast {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
}

/* -------------------- Helpers -------------------- */
const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };
  return { toasts, showToast };
};

/* -------------------- UI Components -------------------- */
const ToastContainer = ({ toasts }: { toasts: Toast[] }) => (
  <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`px-4 py-2 rounded shadow-lg text-white animate-slide-in-right
        ${toast.type === "success" ? "bg-green-500" : ""}
        ${toast.type === "error" ? "bg-red-500" : ""}
        ${toast.type === "info" ? "bg-blue-500" : ""}`}
      >
        {toast.message}
      </div>
    ))}
  </div>
);

const ProductCard = ({ product, onAdd }: { product: Product; onAdd: () => void }) => (
  <div className="bg-white rounded-lg p-4 shadow hover:scale-105 transition relative">
    <div className="bg-gray-200 h-32 rounded mb-2 flex items-center justify-center overflow-hidden relative group">
      {product.image_url ? (
        <img src={product.image_url} alt={product.name} className="object-cover h-full w-full" />
      ) : (
        <span className="text-gray-500 text-sm">No Image</span>
      )}
      <button
        onClick={onAdd}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition rounded"
      >
        <ShoppingCartIcon className="h-8 w-8 text-white" />
      </button>
    </div>
    <h3 className="font-semibold">{product.name}</h3>
    <p className="text-sm text-gray-600">Rp {product.price.toLocaleString()}</p>
  </div>
);

const CategoryNode = ({
  node,
  level,
  selectedPath,
  openCategories,
  onToggle,
  onSelect,
}: {
  node: Category;
  level: number;
  selectedPath: number[];
  openCategories: Record<number, boolean>;
  onToggle: (id: number) => void;
  onSelect: (id: number, level: number) => void;
}) => {
  const isSelected = selectedPath[level] === node.id;
  const isOpen = openCategories[node.id] || false;

  return (
    <li>
      <div
        onClick={() => {
          onToggle(node.id);
          onSelect(node.id, level);
        }}
        className={`cursor-pointer px-2 py-1 rounded hover:bg-yellow-100 transition flex justify-between items-center
          ${isSelected ? "bg-yellow-200 font-bold" : ""}`}
      >
        {node.name}
        {node.subcategories?.length ? (
          <span className="ml-2 text-xs text-gray-500">{isOpen ? "−" : "+"}</span>
        ) : null}
      </div>

      {node.subcategories?.length ? (
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-1" : "max-h-0"}`}>
          <ul className="ml-4 space-y-1">
            {node.subcategories.map((child) => (
              <CategoryNode
                key={child.id}
                node={child}
                level={level + 1}
                selectedPath={selectedPath}
                openCategories={openCategories}
                onToggle={onToggle}
                onSelect={onSelect}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
};

const CheckoutModal = ({
  items,
  onClose,
  onConfirm,
}: {
  items: any[];
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t pt-2 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Main Component -------------------- */
export default function Home() {
  const { items: cartItems, add } = useCart();
  const { toasts, showToast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  /* -------- Data Fetching -------- */
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${apiUrl}/categories`);
      setCategories(res.data?.data || res.data || []);
    } catch (err) {
      showToast("Gagal memuat kategori", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const lastId = selectedPath[selectedPath.length - 1];
      const res = await api.get(`${apiUrl}/products`, { params: lastId ? { category_id: lastId } : {} });
      setProducts(res.data?.data || res.data || []);
    } catch {
      showToast("Gagal memuat produk", "error");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* -------- Handlers -------- */
  const toggleCategory = (id: number) => setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  const selectNode = (id: number, level: number) => setSelectedPath((prev) => [...prev.slice(0, level), id]);
  const selectAll = () => setSelectedPath([]);
  const handleAddToCart = (product: Product) => {
    add({ product_id: product.id, name: product.name, price: product.price, quantity: 1 });
    showToast(`${product.name} ditambahkan ke cart`, "success");
  };

  const handleCheckout = () => {
    if (!cartItems.length) return showToast("Cart kosong!", "info");
    setIsModalOpen(true);
  };

  const confirmCheckout = async () => {
    try {
      const res = await api.post(`${apiUrl}/create-transaction`, { items: cartItems });
      const snapToken = res.data.token;
      (window as any).snap.pay(snapToken, {
        onSuccess: () => showToast("Pembayaran sukses!", "success"),
        onPending: () => showToast("Pembayaran menunggu konfirmasi.", "info"),
        onError: () => showToast("Pembayaran gagal.", "error"),
        onClose: () => showToast("Popup ditutup tanpa pembayaran.", "info"),
      });
      setIsModalOpen(false);
    } catch {
      showToast("Gagal membuat transaksi Midtrans.", "error");
    }
  };

  /* -------- Effects -------- */
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [selectedPath]);

  /* -------- Render -------- */
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
            className={`cursor-pointer px-2 py-1 rounded mb-2 hover:bg-yellow-100 transition ${
              !selectedPath.length ? "bg-yellow-200 font-bold" : ""
            }`}
          >
            Semua Produk
          </div>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <CategoryNode
                key={cat.id}
                node={cat}
                level={0}
                selectedPath={selectedPath}
                openCategories={openCategories}
                onToggle={toggleCategory}
                onSelect={selectNode}
              />
            ))}
          </ul>
        </aside>

        {/* Produk */}
        <main className="w-3/4 p-6">
          <h2 className="text-xl font-bold mb-4">
            {!selectedPath.length
              ? "Semua Produk"
              : selectedPath.length === 1
              ? "Produk Kategori"
              : `Produk Subkategori (level ${selectedPath.length})`}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          ) : !products.length ? (
            <p className="text-gray-500">Produk belum tersedia...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={() => handleAddToCart(product)} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Cart */}
      <button
        className={`fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:bg-yellow-400 ${
          !cartItems.length ? "opacity-50 cursor-not-allowed hover:bg-yellow-500" : ""
        }`}
        onClick={handleCheckout}
        disabled={!cartItems.length}
      >
        🛒
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Checkout Modal */}
      {isModalOpen && (
        <CheckoutModal items={cartItems} onClose={() => setIsModalOpen(false)} onConfirm={confirmCheckout} />
      )}

      {/* Toast */}
      <ToastContainer toasts={toasts} />

      <style>{`
        @keyframes slide-in-right {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
      `}</style>
    </div>
  );
}
