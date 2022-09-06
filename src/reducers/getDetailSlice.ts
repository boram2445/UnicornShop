import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";
export interface Detail {
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
}
interface DetailSliceProps {
  detail: [];
  status: string;
}

const initialState: DetailSliceProps = {
  detail: [],
  status: "idle",
};

export const postDetail = createAsyncThunk("detailSlice/postDetail", async (productId?: string) => {
  try {
    const result = await axios.get(`${BASE_URL}/products/${productId}/`);
    return result.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
});

export const detailSlice = createSlice({
  name: "getDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postDetail.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(postDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(postDetail.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectDetail = (state: RootState) => state.detail.detail;
export const getDetailStatus = (state: RootState) => state.detail.status;
export default detailSlice.reducer;
