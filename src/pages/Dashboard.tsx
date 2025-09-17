import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { CartItem } from "../types";


interface DashboardProps {
  addToCart: (item: CartItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      { id: 1, name: "Produk A", price: 50000 },
      { id: 2, name: "Produk B", price: 75000 },
      { id: 3, name: "Produk C", price: 100000 },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((p: Product) => (
        <div
          key={p.id}
          className="p-4 border rounded shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-bold">{p.name}</h3>
          <p className="text-gray-600">Rp{p.price.toLocaleString()}</p>
          <button
            onClick={() =>
              addToCart({
                ...p,
                product_id: p.id, // wajib sesuai interface CartItem
                quantity: 1,
              })
            }
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tambah
          </button>


        </div>
      ))}
    </div>
  );
};

export default Dashboard;
