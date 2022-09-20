import { RootState } from "./../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

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

// export type Item = {
//   product_id: number;
//   product_name: string;
//   image: string;
//   price: number;
//   stock: number;
//   products_info: string;
//   seller: number;
//   store_name: string;
//   shipping_method: string;
//   shipping_fee: number;
// };

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

export const axiosGetCartList = createAsyncThunk(
  "cartList/axiosGetCartList",
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

export const cartListSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(axiosGetCartList.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(axiosGetCartList.fulfilled, (state, action: PayloadAction<CartInfo>) => {
      const { results } = action.payload;
      state.status = "succeeded";
      state.error = "";
      state.cartItems = results;
    });
    builder.addCase(axiosGetCartList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something was wrong";
    });
  },
});

export const selectCartList = (state: RootState) => state.cartList.cartItems;
export const getCartListStatus = (state: RootState) => state.cartList.status;
export const { reset } = cartListSlice.actions;
export default cartListSlice.reducer;
