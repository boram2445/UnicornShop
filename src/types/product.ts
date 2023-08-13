export type Product = {
  image: string;
  price: number;
  product_id: number;
  product_info: string;
  product_name: string;
  seller: number;
  store_name: string;
  shipping_fee: number;
  shipping_method: string;
  stock: number;
  created_at: string;
};

export type ProductPost = {
  product_name?: string;
  image?: File | string | null;
  price?: number;
  shipping_method?: string;
  shipping_fee?: number;
  stock?: number;
  product_info?: string;
  token?: string;
};
