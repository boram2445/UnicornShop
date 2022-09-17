import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Detail } from "./getDetailSlice";

const BASE_URL = "https://openmarket.weniv.co.kr";

export interface Item {
  my_cart: number;
  is_active: boolean;
  cart_item_id: number;
  product_id: number;
  quantity: number;
}

interface ItemList {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: Item[];
}

interface CartListSliceProps {
  cartList: ItemList;
  status: string;
}

const initialState: CartListSliceProps = {
  cartList: { results: [] },
  status: "idle",
};

export const axiosGetCartList = createAsyncThunk(
  "cartList/axiosGetCartList",
  async (TOKEN: string) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    try {
      const result = await axios.get(`${BASE_URL}/cart/`, config);
      console.log(result.data);
      return result.data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
);

export const cartListSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(axiosGetCartList.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(axiosGetCartList.fulfilled, (state, action) => {
      state.cartList = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(axiosGetCartList.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectCartList = (state: RootState) => state.cartList.cartList.results;
export const getCartListStatus = (state: RootState) => state.cartList.status;
export default cartListSlice.reducer;
