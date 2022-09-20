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
  store_name?: string;
  shipping_method?: string;
  shipping_fee?: number;
}
interface DetailSliceProps {
  status: string;
  detail: Detail;
  error: string;
}

const initialState: DetailSliceProps = {
  detail: {},
  status: "idle",
  error: "",
};

export const axiosGetDetail = createAsyncThunk(
  "detail/axiosGetDetail",
  async (productId?: number) => {
    const result = await axios.get(`${BASE_URL}/products/${productId}/`);
    return result.data;
  }
);

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(axiosGetDetail.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(axiosGetDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.status = "succeeded";
      state.error = "";
    });
    builder.addCase(axiosGetDetail.rejected, (state, action) => {
      state.status = "failed";
      state.detail = {};
      state.error = action.error.message || "Something is wrong";
    });
  },
});

export const selectDetail = (state: RootState) => state.detail.detail;
export const getDetailStatus = (state: RootState) => state.detail.status;
export const { reset } = detailSlice.actions;
export default detailSlice.reducer;
