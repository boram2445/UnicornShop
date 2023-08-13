import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Product } from "../types/product";
import { Slice } from "../types/slice";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

type DetailSlice = Slice & {
  detail: Product | null;
};

const initialState: DetailSlice = {
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

export const getDetailState = (state: RootState) => state.detail;

export default detailSlice.reducer;
