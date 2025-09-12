import React from "react";
import type { Product } from "../types.d";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  const handleAdd = () => {
    add({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200
                    w-full max-w-xs mx-auto sm:max-w-full">
      <img
        src="https://placehold.co/300x300"
        alt={product.name}
        className="w-full h-40 sm:h-48 object-cover rounded-lg"
      />

      <h3 className="font-semibold mt-3 text-base sm:text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500 mt-1 sm:text-gray-600 sm:text-sm line-clamp-2">
        {product.description}
      </p>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="font-bold text-base sm:text-lg md:text-xl">
          Rp{product.price.toLocaleString()}
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}
