import { ProductPost } from "../types/product";
import { baseAPI } from "./baseInstance";

export const getSellerProducts = async () => {
  const result = await baseAPI.get(`/seller/`);
  return result.data;
};

export const deleteSellerProduct = async ({ product_id }: { product_id: number }) => {
  await baseAPI.delete(`/products/${product_id}`);
  return product_id;
};

export const postSellerProduct = async ({ formValues }: { formValues: ProductPost }) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const data = { ...formValues };
  const result = await baseAPI.post("/products/", data, config);
  return result.data;
};

export const patchSellerProduct = async ({
  product_id,
  formValues,
}: {
  product_id: number;
  formValues: ProductPost;
}) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result = await baseAPI.patch(`/products/${product_id}/`, formValues, config);
  return result.data;
};
