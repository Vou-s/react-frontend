import React, { createContext, useContext, useState, useMemo } from "react";

interface CartItem {
  product_id: number; // sesuai backend
  name: string;
  price: number;
  quantity: number;
  variant?: string; // ✅ opsi tambahan (misal: ukuran, warna)
}


interface CartContextProps {
  items: CartItem[];
  total: number;
  add: (item: CartItem) => void;
  clear: () => void;
  remove: (product_id: number) => void;
  increase: (product_id: number) => void;
  decrease: (product_id: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // ✅ total selalu dihitung ulang bila items berubah
  const total = useMemo(
    () => items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [items]
  );

  // ✅ helper untuk dispatch event
  const dispatchCartEvent = (type: string, detail: string) => {
    window.dispatchEvent(new CustomEvent(type, { detail }));
  };

  const clear = () => setItems([]);

  const add = (item: CartItem) => {
    setItems((prev) => {
      const exist = prev.find(
        (p) =>
          p.product_id === item.product_id &&
          p.variant === item.variant // kalau ada opsi
      );

      if (exist) {
        dispatchCartEvent("cart:increase", item.name);
        return prev.map((p) =>
          p.product_id === item.product_id && p.variant === item.variant
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        );
      }

      dispatchCartEvent("cart:add", item.name);
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };


  const remove = (product_id: number, variant?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product_id === product_id && i.variant === variant))
    );
  };

  const increase = (product_id: number, variant?: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product_id === product_id && i.variant === variant
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decrease = (product_id: number, variant?: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product_id === product_id && i.variant === variant && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };

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
