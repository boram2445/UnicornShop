import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type DetailProps = {
  product_id?: number;
  product_name?: string;
  image?: string;
  price?: number;
  stock?: number;
  products_info?: string;
  seller?: number;
  seller_store?: string;
  shipping_method?: string;
  shipping_fee?: number;
};

const initialState: { detail: DetailProps | null; status: string } = {
  detail: null,
  status: "init",
};

export const postDetailAxios = createAsyncThunk(
  "getDetailSlice/postAxios",
  async (productId?: string) => {
    const result = await axios.get(`https://openmarket.weniv.co.kr/products/${productId}/`);
    console.log(result.data);
    return result.data;
  }
);

export const getDetail = createSlice({
  name: "getDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postDetailAxios.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(postDetailAxios.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.status = "complete";
    });
    builder.addCase(postDetailAxios.rejected, (state) => {
      state.status = "fail";
    });
  },
});

export const selectDetail = (state: RootState) => state.getDetail.detail;
export const getDetailStatus = (state: RootState) => state.getDetail.status;
export default getDetail.reducer;
