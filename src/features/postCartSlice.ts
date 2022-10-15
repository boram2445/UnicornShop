import { RootState } from "../app/store";
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
  error: string;
}
interface postCartType {
  TOKEN?: string;
  product_id?: number;
  quantity?: number;
  check?: boolean;
}

const initialState: CartSliceProps = {
  item: {},
  status: "idle",
  error: "",
};

export const fetchPostCart = createAsyncThunk(
  "cart/axiosPostCart",
  async ({ TOKEN, product_id, quantity, check }: postCartType) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const data = { product_id, quantity, check };
    const result = await axios.post(`${BASE_URL}/cart/`, data, config);
    console.log(result.data);
    return result.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostCart.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = "succeeded";
      state.error = "";
    });
    builder.addCase(fetchPostCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
      state.item = {};
    });
  },
});

export const postCartItem = (state: RootState) => state.cart.item;
export default cartSlice.reducer;
