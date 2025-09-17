import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types.d';
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<string>("lepi");
    const navigate = useNavigate();
    const { items } = useCart(); // jumlah item dari context

    useEffect(() => {
        setLoading(true);
        api
            .get("/products")
            .then((r) => {
                let data: Product[] = [];
                if (Array.isArray(r.data)) {
                    data = r.data;
                } else if (r.data?.data) {
                    data = r.data.data;
                }
                setProducts(data);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setFiltered(products.filter(p => p.category === category));
    }, [category, products]);

    return (
        <div className="flex container mx-auto p-6">
            {/* Sidebar kategori */}
            <div className="w-1/5 border-r pr-4">
                <h3 className="text-lg font-semibold mb-3">Category</h3>
                <ul className="space-y-2">
                    {["lepi", "hp", "acc", "case"].map(cat => (
                        <li
                            key={cat}
                            className={`cursor-pointer ${category === cat ? "font-bold" : ""}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat === "lepi" ? "Laptop" :
                             cat === "hp" ? "HP" :
                             cat === "acc" ? "Accessories" :
                             "Case"}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Grid Produk */}
            <div className="w-4/5 pl-6">
                <h2 className="text-xl font-bold mb-4">List</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {filtered.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>

            {/* Checkout button */}
            <div className="fixed bottom-6 right-6">
                <button
                    onClick={() => navigate("/checkout")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
                >
                    Checkout ({items.length})
                </button>
            </div>
        </div>
    );
}
