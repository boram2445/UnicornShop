import { ProductPost } from "../types/product";
import { authConfig, baseAPI } from "./baseInstance";

export const getSellerProducts = async (TOKEN: string) => {
  const result = await baseAPI.get(`/seller/`, authConfig(TOKEN));
  return result.data;
};

export const deleteSellerProduct = async ({
  TOKEN,
  product_id,
}: {
  TOKEN: string;
  product_id: number;
}) => {
  await baseAPI.delete(`/products/${product_id}`, authConfig(TOKEN));
  return product_id;
};

export const postSellerProduct = async ({
  TOKEN,
  formValues,
}: {
  TOKEN: string;
  formValues: ProductPost;
}) => {
  const data = { ...formValues, token: TOKEN };
  const result = await baseAPI.post("/products/", data, authConfig(TOKEN, "multipart/form-data"));
  return result.data;
};

export const patchSellerProduct = async ({
  TOKEN,
  product_id,
  formValues,
}: {
  TOKEN: string;
  product_id: number;
  formValues: ProductPost;
}) => {
  const result = await baseAPI.patch(
    `/products/${product_id}/`,
    formValues,
    authConfig(TOKEN, "multipart/form-data")
  );
  return result.data;
};
