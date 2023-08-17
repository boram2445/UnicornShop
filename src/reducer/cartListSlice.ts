import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { CartList } from "../types/cart";
import {
  changeCartProductCount,
  deleteCartItem,
  getCartDetail,
  getCartList,
  postCart,
} from "../api/cart";

const initialState: CartList = {
  status: "idle",
  postStatus: "idle",
  detailStatus: "idle",
  cartItems: [],
  totalPrice: 0,
  deliveryPrice: 0,
  error: "",
};

export const fetchPostCart = createAsyncThunk("cart/axiosPostCart", postCart);
export const fetchGetCartList = createAsyncThunk("cartList/fetchGetCartList", getCartList);
export const fetchDeleteCartItem = createAsyncThunk("cartList/fetchDeleteCartItem", deleteCartItem);
export const fetchGetAllDetail = createAsyncThunk("cartList/fetchGetAllDetail", getCartDetail);
export const fetchPutCartQuantity = createAsyncThunk(
  "cartList/fetchPutCartQuantity",
  changeCartProductCount
);

export const cartListSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    reset: () => initialState,
    checkItem: (state, { payload }) => {
      const { productId, isChecked } = payload;
      state.cartItems.forEach((item) => {
        if (item.product_id === productId)
          isChecked ? (item.isChecked = true) : (item.isChecked = false);
      });
    },
    checkAllItem: (state, { payload }) => {
      const { isChecked } = payload;
      state.cartItems.map((item) => {
        if (item.item.stock) {
          isChecked ? (item.isChecked = true) : (item.isChecked = false);
        }
      });
    },
    setTotalPrice: (state) => {
      let totalPrice = 0;
      let deliveryPrice = 0;
      state.cartItems.map((item) => {
        if (item.isChecked) {
          totalPrice += item.quantity * item.item.price;
          deliveryPrice += item.item.shipping_fee;
        }
      });
      state.totalPrice = totalPrice;
      state.deliveryPrice = deliveryPrice;
    },
  },
  extraReducers: (builder) => {
    builder //
      //장바구니 상품 가져오기
      .addCase(fetchGetCartList.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchGetCartList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.results;
      })
      .addCase(fetchGetCartList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something is wrong";
      })
      //장바구니 전체 디테일 가져오기
      .addCase(fetchGetAllDetail.pending, (state) => {
        state.detailStatus = "loading";
        state.error = "";
      })
      .addCase(fetchGetAllDetail.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        const { cartItems, cartDetails } = action.payload;
        const res = cartItems.map((item, index) => ({
          ...item,
          item: cartDetails[index],
          isChecked: cartDetails[index].stock ? true : false,
        }));
        state.cartItems = res;
      })
      .addCase(fetchGetAllDetail.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = action.error.message || "Something is wrong";
      })
      //장바구니에 상품 추가하기
      .addCase(fetchPostCart.fulfilled, (state) => {
        state.postStatus = "succeeded";
        state.error = "";
      })
      .addCase(fetchPostCart.rejected, (state, action) => {
        state.postStatus = "failed";
        state.error = action.error.message || "Something is wrong";
      })
      //상품 삭제
      .addCase(fetchDeleteCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        const deleteItemId = action.payload;
        const newCartItems = state.cartItems.filter((item) => item.cart_item_id !== deleteItemId);
        //가격 재 계산
        state.cartItems.forEach((item) => {
          if (item.cart_item_id === deleteItemId && item.isChecked)
            state.totalPrice -= item.quantity * item.item.price;
        });
        state.cartItems = newCartItems;
      })
      //장바구니 수량 수정
      .addCase(fetchPutCartQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        const { product_id, quantity } = action.payload;
        state.cartItems.forEach((item) => {
          if (item.product_id === product_id) {
            if (item.isChecked) {
              state.totalPrice -= item.quantity * item.item.price;
              item.quantity = quantity;
              state.totalPrice += quantity * item.item.price;
            } else {
              item.quantity = quantity;
            }
          }
        });
      });
  },
});

export const getCartState = (state: RootState) => state.cartList;
export const getCartQuantity = (state: RootState) => state.cartList.cartItems.length;
export const selectCheckAllState = (state: RootState) =>
  state.cartList.cartItems.every((item) => item.isChecked === true);
export const selectCheckedItems = (state: RootState) =>
  state.cartList.cartItems.filter((item) => item.isChecked === true);

export const { reset, checkItem, checkAllItem, setTotalPrice } = cartListSlice.actions;
export default cartListSlice.reducer;
