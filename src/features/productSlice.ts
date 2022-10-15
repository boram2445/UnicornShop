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
  seller_store: string;
  shipping_fee: number;
  shipping_method: string;
  stock: number;
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

//cretateAsyncThunk(액션명, 콜백함수-비동기로직)
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
  //redux thunk 관리
  extraReducers: (builder) => {
    builder.addCase(fetchGetProducts.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchGetProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.totalPage = Number(Number(action.payload.count) / 15) + 1;
      state.products = action.payload.results;
    });
    builder.addCase(fetchGetProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
      state.products = [];
    });
  },
});

//이렇게 해두면, 컴포넌트에서 함수 명만 가지고 해당 데이터를 부를 수 있다.
//리턴:state.reducer이름.state값
export const selectAllProducts = (state: RootState) => state.products.products;
export const getProductStatus = (state: RootState) => state.products.status;
export const getTotalPageCount = (state: RootState) => state.products.totalPage;

export const selectProductById = (state: RootState, postId: number) =>
  state.products.products.find((product) => product.product_id === postId);

export default productSlice.reducer;
