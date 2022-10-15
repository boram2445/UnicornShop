import { RootState } from "../app/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIyIiwiZXhwIjoxNjY1OTgyNjQ4fQ.MlGGZy8nMKNX9UnxsI2K_puyPWygnIhB-aC5gQjJc4U";

export interface Item {
  image: string;
  price: number;
  product_id: number;
  product_info: string;
  product_name: string;
  seller: number;
  seller_store: string;
  shipping_fee: number;
  shipping_method: string;
  stock: number;
}

type CartInfo = {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartItem[];
};

export type CartItem = {
  my_cart: number;
  is_active: boolean;
  cart_item_id: number;
  product_id: number;
  quantity: number;
  isChecked: boolean;
  item: Item;
};

type PutItemCount = {
  is_active: boolean;
  cart_item_id: number;
  product_id: number;
  quantity: number;
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
    await axios.delete(`${BASE_URL}/cart/${cart_item_id}`, config);
    return cart_item_id;
  }
);

//장바구니 수량 수정
export const fetchPutCartQuantity = createAsyncThunk(
  "cartList/fetchPutCartQuantity",
  async ({ product_id, quantity, cart_item_id, is_active }: PutItemCount) => {
    try {
      const config = {
        headers: {
          Authorization: `JWT ${TOKEN}`,
        },
      };
      const data = { product_id, quantity, is_active };
      const result = await axios.put(`${BASE_URL}/cart/${cart_item_id}/`, data, config);
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
  reducers: {
    reset: () => initialState,
    //상품 디테일 가져오기
    getDetail: (state, { payload }) => {
      const { product_id } = payload;
      state.cartItems.map((item, index) => {
        if (item.product_id === product_id) {
          state.cartItems[index].item = payload;
        }
      });
    },
    //상품 체크 버튼
    checkItem: (state, { payload }) => {
      const { productId, isChecked } = payload;
      state.cartItems.map((item) => {
        if (item.product_id === productId) {
          if (isChecked === true) {
            item.isChecked = true;
          } else if (isChecked === false) {
            item.isChecked = false;
          }
        }
      });
    },
    //전체 상품 체크
    checkAllItem: (state, { payload }) => {
      const { isChecked } = payload;
      state.cartItems.map((item) => {
        if (isChecked === true) {
          item.isChecked = true;
        } else if (isChecked === false) {
          item.isChecked = false;
        }
      });
    },
    // 전체 가격 가져오기
    getTotalPrice: (state) => {
      let totalPrice = 0;
      state.cartItems.map((item) => {
        if (item.isChecked) {
          totalPrice += item.quantity * item.item.price;
        }
      });
      state.totalPrice = totalPrice;
    },
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
      state.cartItems.map((item, index) => {
        if (item.cart_item_id === cart_item_id && item.isChecked) {
          state.totalPrice -= state.cartItems[index].quantity * state.cartItems[index].item.price;
        }
      });
      state.cartItems = state.cartItems.filter((item) => item.cart_item_id !== cart_item_id);
    });
    builder.addCase(fetchPutCartQuantity.fulfilled, (state, action) => {
      state.status = "succeeded";
      const { product_id, quantity } = action.payload;
      state.cartItems.map((item, index) => {
        if (item.product_id === product_id) {
          if (item.isChecked) {
            state.totalPrice -= item.quantity * item.item.price;
            state.cartItems[index].quantity = quantity;
            state.totalPrice += quantity * item.item.price;
          } else {
            state.cartItems[index].quantity = quantity;
          }
        }
      });
    });
  },
});

export const selectCartList = (state: RootState) => state.cartList.cartItems;
export const getCartListStatus = (state: RootState) => state.cartList.status;
export const getCartListError = (state: RootState) => state.cartList.error;

export const selectTotalPrice = (state: RootState) => state.cartList.totalPrice;
export const selectCheckAllState = (state: RootState) =>
  state.cartList.cartItems.every((item) => item.isChecked === true);
export const selectCheckedItems = (state: RootState) =>
  state.cartList.cartItems.filter((item) => item.isChecked === true);
export const { reset, checkItem, checkAllItem, getTotalPrice, getDetail } = cartListSlice.actions;
export default cartListSlice.reducer;
