import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { CartProduct } from "../types/cart";
import { OrderList, OrderPost, OrderProductDetail, OrderType } from "../types/order";
import { RequestStatus, Slice } from "../types/slice";
import { getOrderList, getOrderedProductsDetail, postOrder } from "../api/order";
import { handleAsyncThunkError } from "../utils/slice";

type OrderSlice = Slice & {
  detailStatus: RequestStatus;
  orderItems: CartProduct[];
  shippingfee: number;
  totalPrice: number;
  order_kind: OrderType | null;
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
  order_kind: null,
  orderInfo: null,
  orderedInfo: null,
  orderedDetail: [],
};

export const fetchPostOrder = createAsyncThunk(
  "order/fetchPostOrder",
  async (data: { info: OrderPost }, { rejectWithValue }) => {
    try {
      return await postOrder(data);
    } catch (err: any) {
      return handleAsyncThunkError(err, rejectWithValue, "FAIL_Message");
    }
  }
);
export const fetchGetOrderList = createAsyncThunk("order/fetchGetOrderList", getOrderList);
export const fetchOrderedDetails = createAsyncThunk(
  "order/fetchOrderedDetails",
  getOrderedProductsDetail
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: () => initialState,
    setOrderItem: (state, action) => {
      const orderInfo: { type: OrderType; items: CartProduct[] } = action.payload;
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
    //상품 주문
    builder
      .addCase(fetchPostOrder.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchPostOrder.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(fetchPostOrder.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = action.error.message || "Something is wrong in company number:<";
        }
      })
      //주문 완료 상품 리스트
      .addCase(fetchGetOrderList.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchGetOrderList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.orderedInfo = action.payload;
      })
      .addCase(fetchGetOrderList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something is wrong";
      })
      //주문 상품 디테일
      .addCase(fetchOrderedDetails.pending, (state) => {
        state.detailStatus = "loading";
        state.error = "";
      })
      .addCase(fetchOrderedDetails.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        const { productArr, orderedDetails } = action.payload;
        const res = productArr.map((item, index) => ({
          ...item,
          detail: orderedDetails[index],
        }));
        state.orderedDetail = res;
      })
      .addCase(fetchOrderedDetails.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = action.error.message || "Something is wrong";
      });
  },
});

export const getOrderedItems = (state: RootState) => state.order.orderedDetail;
export const getOrderState = (state: RootState) => state.order;
export const { reset, setOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
