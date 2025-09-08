import React from 'react';
import type { Product } from '../types.d';
import { useCart } from '../context/CartContext';


export default function ProductCard({ product }: { product: Product }) {
    const { add } = useCart();
    return (
        <div className="border rounded p-4 bg-white">
            {/* <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-40 object-cover rounded" /> */}
            <img src="https://placehold.co/300x300" alt="Product" />

            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="mt-3 flex items-center justify-between">
                <div className="font-bold">Rp{product.price.toLocaleString()}</div>
                <button onClick={() => add(product, 1)} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
            </div>
        </div>
    );
}