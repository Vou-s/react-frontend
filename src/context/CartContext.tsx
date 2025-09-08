import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  items: CartItem[];
  total: number;
  add: (item: CartItem) => void;
  clear: () => void;
  remove: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);


  const clear = () => setItems([]);

  const add = (item: CartItem) => {
    setItems((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        const updated = prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p
        );
        const event = new CustomEvent("cart:increase", { detail: item.name });
        window.dispatchEvent(event);
        return updated;
      }
      const event = new CustomEvent("cart:add", { detail: item.name });
      window.dispatchEvent(event);
      return [...prev, { ...item, price: Number(item.price), quantity: item.quantity || 1 }];
    });
  };

  const remove = (id: number) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        const event = new CustomEvent("cart:delete", { detail: item.name });
        window.dispatchEvent(event);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const decrease = (id: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id && i.quantity > 1) {
          const event = new CustomEvent("cart:decrease", { detail: i.name });
          window.dispatchEvent(event);
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      })
    );
  };

  const increase = (id: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const event = new CustomEvent("cart:increase", { detail: i.name });
          window.dispatchEvent(event);
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      })
    );
  };

  useEffect(() => {
    setTotal(
      items.reduce((acc, i) => {
        const price = Number(i.price) || 0;
        const qty = Number(i.quantity) || 0;
        return acc + price * qty;
      }, 0)
    );
  }, [items]);


  return (
    <CartContext.Provider
      value={{ items, total, add, clear, remove, increase, decrease }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
