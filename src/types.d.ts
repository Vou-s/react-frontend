export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: "lepi" | "hp" | "acc" | "case";
  stock?: number;
}

export interface CartItem extends Product {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}
