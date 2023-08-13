import { baseAPI } from "./baseInstance";

export const getProductsPage = async (pageParam: number) => {
  const result = await baseAPI.get(`/products/?page=${pageParam}`);
  return result.data;
};

export const getProductDetail = async (productId: number | undefined) => {
  const result = await baseAPI.get(`/products/${productId}`);
  return result.data;
};

export const getSearchProducts = async (keyword: string) => {
  const result = await baseAPI.get(`/products/?search=${keyword}`);
  return result.data;
};
