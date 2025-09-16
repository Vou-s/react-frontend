import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Home() {
  const { user } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) return;

    const fetchPendingOrders = async () => {
      try {
        const res = await api.get(`${apiUrl}/orders?user_id=${user.id}`);
        const data = res.data?.data || [];
        const pendingOrders = data.filter((order: any) => order.status === "pending");
        setPendingCount(pendingOrders.length);
      } catch (err) {
        console.error("Fetch pending orders error:", err);
      }
    };

    fetchPendingOrders();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to POS App</h1>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Link
          to="/products"
          className="p-6 bg-white rounded shadow text-center hover:bg-gray-100 transition"
        >
          Browse Products
        </Link>

        <Link
          to="/checkout"
          className="p-6 bg-white rounded shadow text-center hover:bg-gray-100 transition"
        >
          Go to Checkout
        </Link>

        <Link
          to="/HistoryCheckout"
          className="relative p-6 bg-white rounded shadow text-center hover:bg-gray-100 transition"
        >
          History Checkout
          {pendingCount > 0 && (
            <span className="absolute top-2 right-2 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {pendingCount}
            </span>
          )}
        </Link>

        <div className="p-6 bg-white rounded shadow text-center hover:bg-gray-100 transition">
          Reports (placeholder)
        </div>
      </div>
    </div>
  );
}
