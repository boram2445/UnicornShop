import axios from "axios";
import { OrderList, OrderPost } from "../types/order";
import { authConfig, baseAPI } from "./baseInstance";

export const postOrder = async ({ TOKEN, info }: { TOKEN: string; info: OrderPost }) => {
  const data = info;
  const selectData =
    info.order_kind === "cart_order"
      ? data
      : { ...data, product_id: info.product_id, quantity: info.quantity };

  const result = await baseAPI.post(`/order/`, selectData, authConfig(TOKEN));
  return result.data;
};

export const getOrderList = async (TOKEN: string) => {
  const result = await baseAPI.get(`/order/`, authConfig(TOKEN));
  return result.data;
};

export const getOrderedProductsDetail = async ({ results }: { results: OrderList[] }) => {
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
