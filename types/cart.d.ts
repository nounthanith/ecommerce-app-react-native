export interface CartItem {
  id: string;
  email: string;
  cartProductName: string;
  cartDescription: string;
  cartProductImage: string;
  cartProductPrice: string;
  cartRating: string;
  quantity: number;
}

export interface CartResponse {
  status: 'success' | 'error';
  data: CartItem[];
  message?: string;
}
