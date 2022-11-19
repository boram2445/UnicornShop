import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartListSlice";

const BASE_URL = "https://openmarket.weniv.co.kr";

interface orderInfoType {
  orderItems: CartItem[];
  shippingfee: number;
  totalPrice: number;
}

const initialState: orderInfoType = {
  orderItems: [],
  shippingfee: 0,
  totalPrice: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderItem: (state, action) => {
      const orderedItems: CartItem[] = action.payload;
      state.orderItems = orderedItems;
      state.shippingfee = state.orderItems.reduce((prev, curr) => prev + curr.item.shipping_fee, 0);
      state.totalPrice = state.orderItems?.reduce(
        (prev, curr) => prev + curr.quantity * curr.item.price,
        0
      );
    },
  },
});

export const selectOrderItems = (state: RootState) => state.order.orderItems;
export const selectTotalPrice = (state: RootState) => state.order.totalPrice;
export const selectDeliveryPrice = (state: RootState) => state.order.shippingfee;

export const { getOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
