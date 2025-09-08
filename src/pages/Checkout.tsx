import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import { useEffect } from "react";

export default function Checkout() {
    const { items, total, clear, remove, increase, decrease } = useCart();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    const handlePayment = async () => {
        if (items.length === 0) return setToast("Cart kosong");
        setLoading(true);
        try {
            const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

            const payload = {
                items: items.map((i) => ({
                    product_id: i.id,
                    product_name: i.name,
                    price: i.price,
                    quantity: i.quantity,
                })),
                total,
                customer: { name: "Customer Demo", email: "customer@test.com" },
            };

            const res = await api.post("/orders", payload);
            console.log("Payload yang dikirim:", payload); // ⬅️ debug
            const token = res.data.snap_token || res.data.token;
            if (!token) throw new Error("snap token tidak ditemukan");

            (window as any).snap.pay(token, {
                onSuccess: function () {
                    setToast("Pembayaran sukses");
                    clear();
                    window.location.href = "/payment-success";
                },
                onPending: function () {
                    setToast("Pembayaran pending — tunggu konfirmasi");
                },
                onError: function () {
                    setToast("Pembayaran gagal");
                },
                onClose: function () {
                    setToast("Anda menutup pembayaran");
                },
            });
        } catch (err: any) {
            console.error(err);
            setToast(
                err?.response?.data?.message || err.message || "Gagal membuat order"
            );
        } finally {
            setLoading(false);
            setTimeout(() => setToast(null), 4000);
        }
    };


    useEffect(() => {
        const handlerAdd = (e: any) => {
            setToast(`✅ ${e.detail} ditambahkan ke cart`);
            setTimeout(() => setToast(null), 3000);
        };

        const handlerRemove = (e: any) => {
            setToast(`🗑️ ${e.detail} dihapus dari cart`);
            setTimeout(() => setToast(null), 3000);
        };

        const handlerDecrease = (e: any) => {
            setToast(`➖ Jumlah ${e.detail} dikurangi`);
            setTimeout(() => setToast(null), 3000);
        };

        const handlerIncrease = (e: any) => {
            setToast(`➕ Jumlah ${e.detail} ditambah`);
            setTimeout(() => setToast(null), 3000);
        };

        window.addEventListener("cart:add", handlerAdd);
        window.addEventListener("cart:remove", handlerRemove);
        window.addEventListener("cart:decrease", handlerDecrease);
        window.addEventListener("cart:increase", handlerIncrease);

        return () => {
            window.removeEventListener("cart:add", handlerAdd);
            window.removeEventListener("cart:remove", handlerRemove);
            window.removeEventListener("cart:decrease", handlerDecrease);
            window.removeEventListener("cart:increase", handlerIncrease);
        };
    }, []);


    return (
        <div className="p-6 container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            {toast && <Toast message={toast} />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* CART */}
                <div className="md:col-span-2 bg-white p-4 rounded-xl shadow">
                    {items.length === 0 ? (
                        <div>Cart kosong</div>
                    ) : (
                        items.map((i) => (
                            <div
                                key={i.id}
                                className="flex items-center justify-between p-2 border-b"
                            >
                                <div>
                                    <div className="font-semibold">{i.name}</div>
                                    <div className="text-sm text-gray-500">
                                        Rp{i.price.toLocaleString()} x {i.quantity}
                                    </div>
                                    <div className="flex gap-2 mt-1">
                                        <button
                                            onClick={() => decrease(i.id)}
                                            className="px-2 bg-gray-200 rounded"
                                        >
                                            -
                                        </button>
                                        <button
                                            onClick={() => increase(i.id)}
                                            className="px-2 bg-gray-200 rounded"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => remove(i.id)}
                                            className="px-2 bg-red-500 text-white rounded"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                                <div className="font-medium">
                                    Rp{(i.price * i.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* RINGKASAN */}
                <div className="bg-white p-4 rounded-xl shadow">
                    <div className="text-sm text-gray-500">Ringkasan</div>
                    <div className="text-2xl font-bold mt-2">
                        Rp{total.toLocaleString()}
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className={`mt-4 w-full py-3 rounded-2xl font-semibold text-white ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {loading ? (
                            <>
                                <Spinner /> <span className="ml-2">Memproses...</span>
                            </>
                        ) : (
                            "Bayar Sekarang"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
