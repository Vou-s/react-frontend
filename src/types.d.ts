export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  stock?: number;
}

export interface CartItem extends Product {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}
