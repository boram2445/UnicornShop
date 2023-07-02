import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";
import axios from "axios";
import { RootState } from "../app/store";

const BASE_URL = "https://openmarket.weniv.co.kr";

interface DetailSliceState {
  status: string;
  error: string;
  detail: Product | null;
}

const initialState: DetailSliceState = {
  status: "idle",
  error: "",
  detail: null,
};

export const fetchProductDetail = createAsyncThunk(
  "products/fetchGetProductDetail",
  async (productId: number | undefined) => {
    const result = await axios.get(`${BASE_URL}/products/${productId}`);
    return result.data;
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.detail = action.payload;
    });
    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
    });
  },
});

export const getProductDetail = (state: RootState) => state.detail.detail;

export default detailSlice.reducer;
