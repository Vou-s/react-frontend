import React from "react";
import { Product } from "../types/Product";

interface CartProps {
    cart: Product[];
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart }) => {
    return (
        <div className="p-4 bg-white shadow rounded-2xl">
            <h2 className="text-lg font-semibold mb-2">Keranjang</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Keranjang kosong</p>
            ) : (
                <ul className="space-y-2">
                    {cart.map((item: Product, i: number) => (
                        <li
                            key={i}
                            className="flex justify-between items-center border-b pb-1"
                        >
                            <span>
                                {item.name} - Rp {item.price.toLocaleString()}
                            </span>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
