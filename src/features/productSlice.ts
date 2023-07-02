import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";
//state product 타입
export interface Product {
  image: string;
  price: number;
  product_id: number;
  product_info: string;
  product_name: string;
  seller: number;
  store_name: string;
  shipping_fee: number;
  shipping_method: string;
  stock: number;
  created_at: string;
}

//state 초기값 타입
interface ProductSliceState {
  status: string; //idle | loading | succeeded | failed
  error: string;
  totalPage: number;
  products: Product[];
}

//state 초기값
const initialState: ProductSliceState = {
  status: "idle",
  error: "",
  totalPage: 1,
  products: [],
};

//페이지별 상품 가져오기
export const fetchGetProducts = createAsyncThunk(
  "products/fetchPostProducts",
  async (pageParam: number) => {
    const result = await axios.get(`${BASE_URL}/products/?page=${pageParam}`);
    return result.data;
  }
);

//state 저장
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchGetProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.totalPage = Math.floor(Number(Number(action.payload.count) / 15)) + 1;
      state.products = action.payload.results;
    });
    builder.addCase(fetchGetProducts.rejected, (state, action) => {
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
