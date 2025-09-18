import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function Checkout() {
  const { items, total, clear, remove, increase, decrease, setItems } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [alreadyFetched, setAlreadyFetched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  // Load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [clientKey]);

  // Isi cart dari order lama jika ada order_id di query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get("order_id");
    if (orderId && user && !alreadyFetched) {
      fetchOrderItems(Number(orderId));
      setAlreadyFetched(true);
    }
  }, [location.search, user, alreadyFetched]);

  const fetchOrderItems = async (orderId: number) => {
    try {
      const res = await api.get(`${apiUrl}/orders/${orderId}`);
      const order = res.data?.data;
      if (order?.items?.length > 0) {
        const newItems = order.items.map((i: any) => ({
          product_id: i.product_id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        }));
        clear();
        setItems(newItems);
        showToast("Cart diisi dari order sebelumnya");
      }
    } catch (err: any) {
      console.error("Fetch order items error:", err.response?.data || err.message);
      showToast("Gagal memuat order lama");
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const calculateTotal = () => {
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    if (totalAmount <= 0) throw new Error("Total order harus lebih dari 0");
    return totalAmount;
  };

  const handlePayment = async () => {
    if (!user) {
      showToast("Silakan login terlebih dahulu");
      return navigate("/login");
    }

    if (items.length === 0) {
      showToast("Cart kosong");
      return;
    }

    setLoading(true);

    try {
      const totalAmount = calculateTotal();

      const orderPayload = {
        user_id: user.id,
        total_amount: total, // total dari useCart()
        status: "pending",
        payment_method: "midtrans",
        items: items.map(i => ({
          product_id: i.product_id,
          quantity: i.quantity,
          price: i.price,
        })),
      };
      console.log("ORDER PAYLOAD:", JSON.stringify(orderPayload, null, 2));


      const orderRes = await api.post(`${apiUrl}/orders`, orderPayload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const orderId = orderRes.data?.data?.id || orderRes.data?.id;
      if (!orderId) throw new Error("Order ID tidak ditemukan");

      // Ambil snap token dari backend
      const tokenRes = await api.post(`${apiUrl}/midtrans/token`, {
        order_id: String(orderId),
        gross_amount: totalAmount,
      });

      const snapToken = tokenRes.data?.snap_token;
      if (!snapToken) throw new Error("Snap token tidak ditemukan");

      // Pastikan snap sudah tersedia
      if (!(window as any).snap || typeof (window as any).snap.pay !== "function") {
        throw new Error("Midtrans Snap belum terload");
      }

      (window as any).snap.pay(snapToken, {
        onSuccess: () => {
          showToast("Pembayaran sukses");
          clear();
          navigate("/payment-success");
        },
        onPending: () => showToast("Pembayaran pending — tunggu konfirmasi"),
        onError: () => showToast("Pembayaran gagal"),
        onClose: () => showToast("Anda menutup pembayaran"),
      });
    } catch (err: any) {
      console.error("Checkout error:", err);
      const message =
        err?.response?.data?.message || err.message || "Terjadi kesalahan";
      showToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {toast && <Toast message={toast} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart */}
        <div className="md:col-span-2 bg-white p-4 rounded-xl shadow">
          {items.length === 0 ? (
            <div>Cart kosong</div>
          ) : (
            items.map((i) => (
              <div key={i.product_id} className="flex items-center justify-between p-2 border-b">
                <div>
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-gray-500">
                    Rp{i.price.toLocaleString()} x {i.quantity}
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => decrease(i.product_id)} className="px-2 bg-gray-200 rounded">-</button>
                    <button onClick={() => increase(i.product_id)} className="px-2 bg-gray-200 rounded">+</button>
                    <button onClick={() => remove(i.product_id)} className="px-2 bg-red-500 text-white rounded">Hapus</button>
                  </div>
                </div>
                <div className="font-medium">
                  Rp{(i.price * i.quantity).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Ringkasan & Bayar */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="text-sm text-gray-500">Ringkasan</div>
          <div className="text-2xl font-bold mt-2">Rp{total.toLocaleString()}</div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-2xl font-semibold text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? (
              <><Spinner /> <span className="ml-2">Memproses...</span></>
            ) : (
              "Bayar Sekarang"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
