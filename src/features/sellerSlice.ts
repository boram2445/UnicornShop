import { Product } from "./productSlice";
import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

interface SellerState {
  status: string;
  error: string;
  products: Product[];
}

const initialState: SellerState = {
  status: "idle",
  error: "",
  products: [],
};

//판매자 상품 가져오기
export const fetchGetSellerProduct = createAsyncThunk(
  "seller/fetchGetSellerProduct",
  async (TOKEN: string) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const result = await axios.get(`${BASE_URL}/seller/`, config);
    console.log(result.data);
    return result.data;
  }
);

//판매자 상품 삭제
export const fetchDeleteSellerItem = createAsyncThunk(
  "seller/fetchDeleteSellerItem",
  async ({ TOKEN, product_id }: { TOKEN: string; product_id: number }) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    await axios.delete(`${BASE_URL}/products/${product_id}`, config);
    return product_id;
  }
);

const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetSellerProduct.pending, (state) => {
      state.status = "Loading";
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
    builder.addCase(fetchDeleteSellerItem.pending, (state) => {
      state.status = "Loading";
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
  },
});

export const getSellerStatus = (state: RootState) => state.seller.status;
export const selectSellerProducts = (state: RootState) => state.seller.products;
export default sellerSlice.reducer;
