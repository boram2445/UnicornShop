import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Product } from "../types/product";
import { Slice } from "../types/slice";
import {
  deleteSellerProduct,
  getSellerProducts,
  patchSellerProduct,
  postSellerProduct,
} from "../api/seller";

type SellerProduct = Product & {
  store_name: string;
};

type SellerSlice = Slice & {
  products: SellerProduct[];
  modifyItemId: number;
};

const initialState: SellerSlice = {
  status: "idle",
  error: "",
  products: [],
  modifyItemId: 0,
};

export const fetchGetSellerProduct = createAsyncThunk(
  "seller/fetchGetSellerProduct",
  getSellerProducts
);
export const fetchDeleteSellerItem = createAsyncThunk(
  "seller/fetchDeleteSellerItem",
  deleteSellerProduct
);
export const fetchPostItem = createAsyncThunk("seller/fetchPostItem", postSellerProduct);
export const fetchPatchSellerItem = createAsyncThunk(
  "seller/fetchPatchSellerItem",
  patchSellerProduct
);

const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = "";
      state.modifyItemId = 0;
    },
    getModifyId: (state, action) => {
      state.modifyItemId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //상품 불러오기
    builder.addCase(fetchGetSellerProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchGetSellerProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.products = action.payload.results;
    });
    builder.addCase(fetchGetSellerProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
      state.products = [];
    });
    // 판매자 상품 삭제
    builder.addCase(fetchDeleteSellerItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchDeleteSellerItem.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.products = state.products.filter((item) => item.product_id !== action.payload);
    });
    builder.addCase(fetchDeleteSellerItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
      state.products = [];
    });
    //판매자 상품 등록
    builder.addCase(fetchPostItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostItem.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.products = state.products.filter((item) => item.product_id !== action.payload);
    });
    builder.addCase(fetchPostItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
    });
    //판매자 상품 수정
    builder.addCase(fetchPatchSellerItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPatchSellerItem.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.products = state.products
        .filter((item) => item.product_id !== action.payload)
        .splice(0, 0, action.payload);
    });
    builder.addCase(fetchPatchSellerItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
    });
  },
});

export const getSellerState = (state: RootState) => state.seller;
export const getSellerStatus = (state: RootState) => state.seller.status;
export const selectSellerProducts = (state: RootState) => state.seller.products;

export const selectModifyId = (state: RootState) => state.seller.modifyItemId;
export const selectModifyItem = (state: RootState) =>
  state.seller.products.find((item) => item.product_id === state.seller.modifyItemId);

export const { reset, getModifyId } = sellerSlice.actions;
export default sellerSlice.reducer;
