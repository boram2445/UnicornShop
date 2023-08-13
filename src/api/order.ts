import axios from "axios";
import { OrderList, OrderPost } from "../types/order";
import { baseAPI } from "./baseInstance";

export const postOrder = async ({ TOKEN, info }: { TOKEN: string; info: OrderPost }) => {
  try {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const data = info;
    const selectData =
      info.order_kind === "cart_order"
        ? data
        : { ...data, product_id: info.product_id, quantity: info.quantity };

    const result = await baseAPI.post(`/order/`, selectData, config);
    return result.data;
  } catch (error: any) {
    //서버 에러 메세지 받아오기 -개선 필요
    console.log(error.response.data);
    return error.response.data;
  }
};

export const getOrderList = async (TOKEN: string) => {
  const config = {
    headers: {
      Authorization: `JWT ${TOKEN}`,
    },
  };
  const result = await baseAPI.get(`/order/`, config);
  return result.data;
};

export const getOrderedProductsDetail = async ({
  results,
}: {
  count: number;
  next: string | null;
  previous: string | null;
  results: OrderList[];
}) => {
  const productArr = results
    .map((item) => [
      ...item.order_items.map((data, index) => ({
        product_id: data,
        created_at: item.created_at,
        detail: null,
        quantity: item.order_quantity[index],
      })),
    ])
    .flat();

  const promiseArr = [...productArr.map((item) => baseAPI.get(`/products/${item.product_id}/`))];
  const orderedDetails = await axios
    .all(promiseArr)
    .then(axios.spread((...responses) => responses.map((res) => res.data)));
  return { productArr, orderedDetails };
};
