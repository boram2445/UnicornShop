import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

interface Item {
  my_cart?: number;
  cart_item_id?: number;
  product_id?: number;
  quantity?: number;
}

interface CartSliceProps {
  item: Item;
  status: string;
}

const initialState: CartSliceProps = {
  item: {},
  status: "idle",
};

interface postCartType {
  TOKEN?: string;
  product_id?: number;
  quantity?: number;
  check?: boolean;
}

export const axiosPostCart = createAsyncThunk(
  "cart/axiosPostCart",
  async ({ TOKEN, product_id, quantity, check }: postCartType) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const data = { product_id, quantity, check };
    try {
      const result = await axios.post(`${BASE_URL}/cart/`, data, config);
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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(axiosPostCart.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(axiosPostCart.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const postCartItem = (state: RootState) => state.cart.item;
export default cartSlice.reducer;
