import { Product } from "./product";

export type CartList = {
  status: string;
  postStatus: string;
  detailStatus: string;
  cartItems: CartProduct[];
  totalPrice: number;
  deliveryPrice: number;
  error: string;
};

export type CartProduct = {
  my_cart: number;
  is_active: boolean;
  cart_item_id: number;
  product_id: number;
  quantity: number;
  isChecked: boolean;
  item: Product;
};

export type CartProductCount = {
  TOKEN: string;
  cart_item_id: number;
  product_id: number;
  quantity: number;
  is_active: boolean;
};

export type CartPost = {
  TOKEN?: string;
  product_id?: number;
  quantity?: number;
  check?: boolean;
};
