import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types.d';



export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api
            .get("/products")
            .then((r) => {
                // cek kalau response berupa array
                if (Array.isArray(r.data)) {
                    setProducts(r.data);
                } else if (r.data?.data) {
                    // kalau backend pakai format { data: [...] }
                    setProducts(r.data.data);
                } else {
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);


    return (
        <div className="container mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-3 gap-4">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
            )}
        </div>
    );
}