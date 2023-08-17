import { Product } from "./product";

export type OrderType = "cart_order" | "direct_order" | "cart_one_order" | null;

export type OrderPost = {
  product_id?: number;
  quantity?: number;
  order_kind: OrderType;
  receiver: string;
  receiver_phone_number: string;
  address: string;
  address_message: string;
  payment_method: string;
  total_price: number;
};

export type OrderList = {
  buyer: string;
  order_number: number;
  order_items: number[];
  order_quantity: number[];
  receiver: string;
  receiver_phone_number: string;
  address: string;
  address_message: string;
  payment_method: string;
  total_price: number;
  created_at: string;
};

export type OrderProductDetail = {
  product_id: number;
  created_at: string;
  detail: Product;
  quantity: number;
};
