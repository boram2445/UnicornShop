import { RootState } from "./../store";
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
  products: Product[];
}

//state 초기값
const initialState: ProductSliceState = {
  status: "idle",
  error: "",
  products: [],
};

//cretateAsyncThunk(액션명, 콜백함수-비동기로직)
export const axiosGetProducts = createAsyncThunk("products/axiosPostProducts", async () => {
  const result = await axios.get(`${BASE_URL}/products/`);
  return result.data.results;
});

//state 저장
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  //redux thunk 관리
  extraReducers: (builder) => {
    builder.addCase(axiosGetProducts.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(axiosGetProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.products = action.payload;
    });
    builder.addCase(axiosGetProducts.rejected, (state, action) => {
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
export default productSlice.reducer;
