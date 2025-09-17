import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

export default function HistoryCheckout() {
  const { user } = useAuth();
  const { setItems, clear } = useCart();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [hasPending, setHasPending] = useState(false); // 🔹 Notifikasi

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      setToast("Silakan login terlebih dahulu");
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${apiUrl}/orders?user_id=${user!.id}`);

      const data = res.data?.data || [];
      setOrders(data);

      // 🔹 Cek apakah ada order pending untuk notif
      setHasPending(data.some((order: { status: string; }) => order.status === "pending"));
    } catch (err: any) {
      console.error("Fetch orders error:", err.response?.data || err.message);
      setToast(err?.response?.data?.message || err.message || "Gagal mengambil order");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const toggleExpand = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handlePayAgain = (order: any) => {
    if (!order.items || order.items.length === 0) return;

    const newItems = order.items.map((i: any) => ({
      product_id: i.product_id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    }));

    clear();
    setItems(newItems);
    window.location.href = `/checkout?order_id=${order.id}`;
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        Riwayat Checkout
        {hasPending && (
          <span className="ml-3 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </span>
        )}
      </h1>

      {toast && <Toast message={toast} />}

      {loading ? (
        <div className="flex justify-center"><Spinner /></div>
      ) : orders.length === 0 ? (
        <div>Tidak ada riwayat checkout.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow relative">
              {order.status === "pending" && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                  Pending
                </span>
              )}

              <div className="flex justify-between mb-2">
                <div>
                  <div className="font-semibold">Order ID: {order.id}</div>
                  <div className="text-sm text-gray-500">
                    Tanggal: {new Date(order.created_at).toLocaleString()}
                  </div>
                </div>
                {/* <div className={`font-bold ${
                  order.status === "success" ? "text-green-600" :
                  order.status === "pending" ? "text-yellow-600" : "text-red-600"
                }`}>
                  {order.status.toUpperCase()}
                </div> */}
              </div>

              <button
                onClick={() => toggleExpand(order.id)}
                className="text-indigo-600 hover:underline mb-2"
              >
                {expandedOrderId === order.id ? "Sembunyikan Detail" : "Lihat Detail"}
              </button>

              {expandedOrderId === order.id && (
                <div className="border-t pt-2">
                  {order.items.map((item: any) => (
                    <div key={item.product_id} className="flex justify-between py-1">
                      <div>{item.product?.name || "Produk"}</div>
                      <div>
                        {item.quantity} x Rp{item.price.toLocaleString()} = Rp
                        {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}


              <div className="mt-2 font-bold text-right">
                Total: Rp{order.total_amount.toLocaleString()}
              </div>

              {order.status === "pending" && (
                <button
                  onClick={() => handlePayAgain(order)}
                  className="mt-2 w-full py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Bayar Ulang
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
