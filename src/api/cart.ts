import axios from "axios";
import { CartPost, CartProduct, CartProductCount } from "../types/cart";
import { baseAPI } from "./baseInstance";

//카트 담기
export const postCart = async ({ TOKEN, product_id, quantity, check }: CartPost) => {
  const config = {
    headers: {
      Authorization: `JWT ${TOKEN}`,
    },
  };
  const data = { product_id, quantity, check };
  const result = await baseAPI.post("/cart/", data, config);
  return result.data;
};

//카트 상품 가져오기
export const getCartList = async (TOKEN: string) => {
  const config = {
    headers: {
      Authorization: `JWT ${TOKEN}`,
    },
  };
  const result = await baseAPI.get("/cart/", config);
  return result.data;
};

//카트 상품 삭제
export const deleteCartItem = async ({
  TOKEN,
  cart_item_id,
}: {
  TOKEN: string;
  cart_item_id: number;
}) => {
  const config = {
    headers: {
      Authorization: `JWT ${TOKEN}`,
    },
  };

  await baseAPI.delete(`/cart/${cart_item_id}`, config);
  return cart_item_id;
};

//장바구니 수량 수정
export const changeCartProductCount = async ({
  TOKEN,
  product_id,
  quantity,
  cart_item_id,
  is_active,
}: CartProductCount) => {
  const config = {
    headers: {
      Authorization: `JWT ${TOKEN}`,
    },
  };
  const data = { product_id, quantity, is_active };
  const result = await baseAPI.put(`/cart/${cart_item_id}/`, data, config);
  return result.data;
};

//상품 디테일
export const getCartDetail = async (cartItems: CartProduct[]) => {
  const promiseArr = [...cartItems.map((item) => baseAPI.get(`/products/${item.product_id}/`))];
  const cartDetails = await axios
    .all(promiseArr)
    .then(axios.spread((...responses) => responses.map((res) => res.data)));
  return { cartItems, cartDetails };
};
