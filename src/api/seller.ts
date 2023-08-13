import { ProductPost } from "../types/product";
import { baseAPI } from "./baseInstance";

export const getSellerProducts = async (TOKEN: string) => {
  const config = {
    headers: {
      Authorization: `JWT ${TOKEN}`,
    },
  };
  const result = await baseAPI.get(`/seller/`, config);
  return result.data;
};

export const deleteSellerProduct = async ({
  TOKEN,
  product_id,
}: {
  TOKEN: string;
  product_id: number;
}) => {
  const config = {
    headers: {
      Authorization: `JWT ${TOKEN}`,
    },
  };
  await baseAPI.delete(`/products/${product_id}`, config);
  return product_id;
};

export const postSellerProduct = async ({
  TOKEN,
  formValues,
}: {
  TOKEN: string;
  formValues: ProductPost;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const data = { ...formValues, token: TOKEN };
    const result = await baseAPI.post(`/products/`, data, config);
    return result.data;
  } catch (error: any) {
    //서버 에러 메세지 받아오기 -개선 필요
    console.log(error.response.data);
    return error.response.data;
  }
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
  try {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const result = await baseAPI.patch(`/products/${product_id}/`, formValues, config);
    return result.data;
  } catch (error: any) {
    //서버 에러 메세지 받아오기 -개선 필요
    console.log(error.response.data);
    return error.response.data;
  }
};
