import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "./cartListSlice";
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
}

interface OrderType {
  status: string;
  error: string;
  orderItems: CartItem[];
  shippingfee: number;
  totalPrice: number;
  order_kind: string;
  orderInfo: OrderInfoType | null;
  orderedInfo: { count: number; next: string; previous: string; results: OrderedListType[] } | null;
}

const initialState: OrderType = {
  status: "idle",
  error: "",
  orderItems: [],
  shippingfee: 0,
  totalPrice: 0,
  order_kind: "",
  orderInfo: null,
  orderedInfo: null,
};

//주문하기
export const fetchPostOrder = createAsyncThunk(
  "order/fetchPostOrder",
  async ({ TOKEN, info }: { TOKEN: string; info: OrderInfoType }) => {
    const {
      order_kind,
      total_price,
      receiver,
      receiver_phone_number,
      address,
      address_message,
      payment_method,
    } = info;
    try {
      const config = {
        headers: {
          Authorization: `JWT ${TOKEN}`,
        },
      };
      const data = {
        order_kind,
        total_price,
        receiver,
        receiver_phone_number,
        address,
        address_message,
        payment_method,
      };
      const selectData =
        order_kind === "cart_order"
          ? data
          : { product_id: info.product_id, quantity: info.quantity, ...data };

      const result = await axios.post(`${BASE_URL}/order/`, selectData, config);
      console.log(result.data);
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
    console.log(result.data);
    return result.data;
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
  },
});

export const getOrderState = (state: RootState) => state.order;
export const { reset, setOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
