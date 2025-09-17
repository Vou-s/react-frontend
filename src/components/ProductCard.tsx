import React from "react";
import type { Product } from "../types.d";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi"; // import ikon keranjang

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm mx-auto relative group">
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56">
        <img
          src={product.image || "https://placehold.co/400x400"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}

        {/* Add Button Overlay dengan ikon */}
        <button
          onClick={handleAdd}
          className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
        >
          <FiShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="text-[10px] font-bold text-gray-900">
            Rp{product.price.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
    </div>
  );
}
