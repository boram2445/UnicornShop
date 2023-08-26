import { Product } from "./product";
import { RequestStatus } from "./slice";

export type CartList = {
  status: RequestStatus;
  postStatus: RequestStatus;
  detailStatus: RequestStatus;
  error: string;
  cartItems: CartProduct[];
  totalPrice: number;
  deliveryPrice: number;
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
