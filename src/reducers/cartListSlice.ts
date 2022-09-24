import { RootState } from "../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIyIiwiZXhwIjoxNjY0NTIyNzIyfQ.yEWd9zVjAw3Kt-7XYs6xEvIqcMXVjn-08jpjIylRZ5Q";

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
  async (cart_item_id: number) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const result = await axios.put(`${BASE_URL}/cart/${cart_item_id}`, config);
    console.log(result.data);
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

    // onIncrease: (state, { payload }) => {
    //   //만약 체크가 되어있다면 count, quantity둘다 변경 => api 호출
    //   //체크가 안되어있다면 cart quantity만 변경
    // },
    // onDecrease: (state, { payload }) => {},
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
  },
});

export const selectCartList = (state: RootState) => state.cartList.cartItems;
export const getCartListStatus = (state: RootState) => state.cartList.status;
export const selectTotalPrice = (state: RootState) => state.cartList.totalPrice;
export const selectCheckAllState = (state: RootState) =>
  state.cartList.cartItems.every((item) => item.isChecked === true);

export const { reset, checkItem, checkAllItem, getTotalPrice, getDetail } = cartListSlice.actions;
export default cartListSlice.reducer;
