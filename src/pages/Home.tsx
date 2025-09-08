import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to POS App</h1>
            <div className="grid grid-cols-3 gap-4">
                <Link to="/products" className="p-6 bg-white rounded shadow">Browse Products</Link>
                <Link to="/checkout" className="p-6 bg-white rounded shadow">Go to Checkout</Link>
                <div className="p-6 bg-white rounded shadow">Reports (placeholder)</div>
            </div>
        </div>
    );
}