import { RootState } from "../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIxIiwiZXhwIjoxNjYzOTE3MzU4fQ.eULwTjycmcIrbyWV4iokrHwKiX4ghxFMbi7OdQENo-s";

type CartInfo = {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartItem[];
};

type CartItem = {
  my_cart: number;
  is_active: boolean;
  cart_item_id: number;
  product_id: number;
  quantity: number;
  // item: Item;
};

type InitialState = {
  status: string;
  cartItems: CartItem[];
  totalPrice: number;
  deliveryPrice: number;
  error: string;
};

const initialState: InitialState = {
  status: "idle",
  cartItems: [],
  totalPrice: 0,
  deliveryPrice: 0,
  error: "",
};

//카트 상품 가져오기
export const fetchGetCartList = createAsyncThunk(
  "cartList/fetchGetCartList",
  async (TOKEN: string) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const result = await axios.get(`${BASE_URL}/cart/`, config);
    console.log(result.data);
    return result.data;
  }
);

//카트 상품 삭제
export const fetchDeleteCartItem = createAsyncThunk(
  "cartList/fetchDeleteCartItem",
  async (cart_item_id: number) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const result = await axios.delete(`${BASE_URL}/cart/${cart_item_id}`, config);
    console.log(result.data);
    return cart_item_id;
  }
);

export const cartListSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetCartList.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchGetCartList.fulfilled, (state, action: PayloadAction<CartInfo>) => {
      const { results } = action.payload;
      state.status = "succeeded";
      state.error = "";
      state.cartItems = results;
    });
    builder.addCase(fetchGetCartList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something was wrong";
    });
    builder.addCase(fetchDeleteCartItem.fulfilled, (state, action: PayloadAction<number>) => {
      state.status = "succeeded";
      state.error = "";
      const cart_item_id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.cart_item_id !== cart_item_id);
    });
  },
});

export const selectCartList = (state: RootState) => state.cartList.cartItems;
export const getCartListStatus = (state: RootState) => state.cartList.status;
export const { reset } = cartListSlice.actions;
export default cartListSlice.reducer;
