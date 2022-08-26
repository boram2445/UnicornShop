import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//state product 타입
export type ProductProps = {
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
};

//state 초기값
const initialState: { products: ProductProps[]; status: string } = {
  products: [],
  status: "init",
};

//cretateAsyncThunk(액션명, 콜백함수-비동기로직)
export const postProductAxios = createAsyncThunk("getProductSlice/postAxios", async () => {
  const result = await axios.get("https://openmarket.weniv.co.kr/products/");
  return result.data.results;
});

//state 저장
export const getProduct = createSlice({
  name: "getProduct",
  initialState,
  reducers: {},
  //redux thunk 관리
  extraReducers: (builder) => {
    builder.addCase(postProductAxios.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(postProductAxios.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = "complete";
    });
    builder.addCase(postProductAxios.rejected, (state) => {
      state.status = "fail";
    });
  },
});

//이렇게 해두면, 컴포넌트에서 함수 명만 가지고 해당 데이터를 부를 수 있다.
export const selectProducts = (state: RootState) => state.getProduct.products;
export const getProductStatus = (state: RootState) => state.getProduct.status;
export default getProduct.reducer;
