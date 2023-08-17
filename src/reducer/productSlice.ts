import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Product } from "../types/product";
import { Slice } from "../types/slice";
import { getProductsPage } from "../api/product";

type ProductSlice = Slice & {
  totalPage: number;
  products: Product[];
};

const initialState: ProductSlice = {
  status: "idle",
  error: "",
  totalPage: 1,
  products: [],
};

export const fetchGetProducts = createAsyncThunk("products/fetchPostProducts", getProductsPage);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProducts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchGetProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalPage = Math.floor(Number(Number(action.payload.count) / 15)) + 1;
        state.products = action.payload.results;
      })
      .addCase(fetchGetProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something is wrong";
        state.products = [];
      });
  },
});

export const getProductState = (state: RootState) => state.products;
export const selectProductById = (state: RootState, postId: number) =>
  state.products.products.find((product) => product.product_id === postId);

export default productSlice.reducer;
