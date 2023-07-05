import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "./cartListSlice";
import { Product } from "./productSlice";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

//상품 주문
interface OrderInfoType {
  product_id?: number;
  quantity?: number;
  order_kind: string;
  receiver: string;
  receiver_phone_number: string;
  address: string;
  address_message: string;
  payment_method: string;
  total_price: number;
}

//주문 내역
interface OrderedListType {
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
}

interface OrderProductDetailType {
  product_id: number;
  created_at: string;
  detail: Product;
  quantity: number;
}

interface OrderType {
  status: string;
  detailStatus: string;
  error: string;
  orderItems: CartItem[];
  shippingfee: number;
  totalPrice: number;
  order_kind: string;
  orderInfo: OrderInfoType | null;
  orderedInfo: { count: number; next: string; previous: string; results: OrderedListType[] } | null;
  orderedDetail: OrderProductDetailType[];
}

const initialState: OrderType = {
  status: "idle",
  detailStatus: "idle",
  error: "",
  orderItems: [],
  shippingfee: 0,
  totalPrice: 0,
  order_kind: "",
  orderInfo: null,
  orderedInfo: null,
  orderedDetail: [],
};

//주문하기
export const fetchPostOrder = createAsyncThunk(
  "order/fetchPostOrder",
  async ({ TOKEN, info }: { TOKEN: string; info: OrderInfoType }) => {
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

      const result = await axios.post(`${BASE_URL}/order/`, selectData, config);
      return result.data;
    } catch (error: any) {
      //서버 에러 메세지 받아오기 -개선 필요
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

//주문 목록 불러오기
export const fetchPostOrderList = createAsyncThunk(
  "order/fetchPostOrderList",
  async (TOKEN: string) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const result = await axios.get(`${BASE_URL}/order/`, config);
    return result.data;
  }
);

//상품 디테일
export const fetchAllOrderedDetail = createAsyncThunk(
  "order/fetchAllOrderedDetail",
  async ({
    results,
  }: {
    count: number;
    next: string | null;
    previous: string | null;
    results: OrderedListType[];
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

    const promiseArr = [
      ...productArr.map((item) => axios.get(`${BASE_URL}/products/${item.product_id}/`)),
    ];
    const orderedDetails = await axios
      .all(promiseArr)
      .then(axios.spread((...responses) => responses.map((res) => res.data)));
    return { productArr, orderedDetails };
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: () => initialState,
    setOrderItem: (state, action) => {
      const orderInfo: { type: string; items: CartItem[] } = action.payload;
      state.order_kind = orderInfo.type;
      state.orderItems = orderInfo.items;
      state.shippingfee = state.orderItems.reduce((prev, curr) => prev + curr.item.shipping_fee, 0);
      state.totalPrice = state.orderItems?.reduce(
        (prev, curr) => prev + curr.quantity * curr.item.price,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostOrder.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostOrder.fulfilled, (state, action) => {
      state.status = action.payload.FAIL_Message ? "failed" : "succeeded";
      state.error = action.payload.FAIL_Message;
    });
    builder.addCase(fetchPostOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong in company number:<";
    });
    builder.addCase(fetchPostOrderList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostOrderList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.orderedInfo = action.payload;
    });
    builder.addCase(fetchPostOrderList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong in company number:<";
    });
    builder.addCase(fetchAllOrderedDetail.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(fetchAllOrderedDetail.fulfilled, (state, action) => {
      state.status = "succeeded";
      const { productArr, orderedDetails } = action.payload;
      const res = productArr.map((item, index) => ({
        ...item,
        detail: orderedDetails[index],
      }));
      state.orderedDetail = res;
    });
    builder.addCase(fetchAllOrderedDetail.rejected, (state, action) => {
      state.detailStatus = "failed";
      state.error = action.error.message || "Something was wrong";
    });
  },
});

export const getOrderState = (state: RootState) => state.order;
export const { reset, setOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
