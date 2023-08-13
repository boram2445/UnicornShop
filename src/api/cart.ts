import axios from "axios";
import { CartPost, CartProduct, CartProductCount } from "../types/cart";
import { baseAPI, authConfig } from "./baseInstance";

export const postCart = async ({ TOKEN, product_id, quantity, check }: CartPost) => {
  const data = { product_id, quantity, check };
  const result = await baseAPI.post("/cart/", data, authConfig(TOKEN));
  return result.data;
};

export const getCartList = async (TOKEN: string) => {
  const result = await baseAPI.get("/cart/", authConfig(TOKEN));
  return result.data;
};

export const deleteCartItem = async ({
  TOKEN,
  cart_item_id,
}: {
  TOKEN: string;
  cart_item_id: number;
}) => {
  await baseAPI.delete(`/cart/${cart_item_id}`, authConfig(TOKEN));
  return cart_item_id;
};

export const changeCartProductCount = async ({
  TOKEN,
  product_id,
  quantity,
  cart_item_id,
  is_active,
}: CartProductCount) => {
  const data = { product_id, quantity, is_active };
  const result = await baseAPI.put(`/cart/${cart_item_id}/`, data, authConfig(TOKEN));
  return result.data;
};

export const getCartDetail = async (cartItems: CartProduct[]) => {
  const promiseArr = [...cartItems.map((item) => baseAPI.get(`/products/${item.product_id}/`))];
  const cartDetails = await axios
    .all(promiseArr)
    .then(axios.spread((...responses) => responses.map((res) => res.data)));
  return { cartItems, cartDetails };
};
