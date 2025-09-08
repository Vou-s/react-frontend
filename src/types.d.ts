export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
