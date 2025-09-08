import React, { useEffect, useState } from "react";
import api from "../services/api";


interface Order {
  id: number;
  product_name: string;
  quantity: number;
  total: number;
  payment_status: string;
}

const Penjualan: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders");
                setOrders(res.data);
            } catch (err) {
                console.error("Gagal mengambil data penjualan:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="p-6">Memuat data...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Daftar Penjualan</h1>
            {orders.length === 0 ? (
                <div>Tidak ada data penjualan.</div>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Produk</th>
                            <th className="border p-2">Jumlah</th>
                            <th className="border p-2">Total</th>
                            <th className="border p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr key={o.id} className="text-center">
                                <td className="border p-2">{o.id}</td>
                                <td className="border p-2">{o.product_name}</td>
                                <td className="border p-2">{o.quantity}</td>
                                <td className="border p-2">Rp{o.total.toLocaleString()}</td>
                                <td className="border p-2">{o.payment_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Penjualan;