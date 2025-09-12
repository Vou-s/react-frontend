// context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  add: (item: CartItem) => void;
  remove: (product_id: number) => void;
  increase: (product_id: number) => void;
  decrease: (product_id: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (item: CartItem) => setItems([...items, item]);
  const remove = (product_id: number) => setItems(items.filter(i => i.product_id !== product_id));
  const increase = (product_id: number) =>
    setItems(items.map(i => i.product_id === product_id ? { ...i, quantity: i.quantity + 1 } : i));
  const decrease = (product_id: number) =>
    setItems(items.map(i => i.product_id === product_id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i));
  const clear = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, total, add, remove, increase, decrease, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
