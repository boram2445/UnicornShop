import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { CartProduct } from "../types/cart";
import { OrderList, OrderPost, OrderProductDetail } from "../types/order";
import { Slice } from "../types/slice";
import { getOrderList, getOrderedProductsDetail, postOrder } from "../api/order";

type OrderSlice = Slice & {
  detailStatus: string;
  orderItems: CartProduct[];
  shippingfee: number;
  totalPrice: number;
  order_kind: string;
  orderInfo: OrderPost | null;
  orderedInfo: { count: number; next: string; previous: string; results: OrderList[] } | null;
  orderedDetail: OrderProductDetail[];
};

const initialState: OrderSlice = {
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

export const fetchPostOrder = createAsyncThunk("order/fetchPostOrder", postOrder);
export const fetchPostOrderList = createAsyncThunk("order/fetchPostOrderList", getOrderList);
export const fetchAllOrderedDetail = createAsyncThunk(
  "order/fetchAllOrderedDetail",
  getOrderedProductsDetail
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: () => initialState,
    setOrderItem: (state, action) => {
      const orderInfo: { type: string; items: CartProduct[] } = action.payload;
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
