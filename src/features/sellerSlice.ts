import { Product } from "./productSlice";
import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

export interface ItemPostType {
  product_name?: string;
  image?: File | string | null;
  price?: number;
  shipping_method?: string;
  shipping_fee?: number;
  stock?: number;
  product_info?: string;
  token?: string;
}
interface SellerType {
  status: string;
  error: string;
  products: Product[];
  modifyItemId: number;
}

const initialState: SellerType = {
  status: "idle",
  error: "",
  products: [],
  modifyItemId: 0,
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

//판매자 상품 등록하기
export const fetchPostItem = createAsyncThunk(
  "seller/fetchPostItem",
  async ({ TOKEN, formValues }: { TOKEN: string; formValues: ItemPostType }) => {
    try {
      const config = {
        headers: {
          Authorization: `JWT ${TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const data = { ...formValues, token: TOKEN };
      const result = await axios.post(`${BASE_URL}/products/`, data, config);
      console.log(result.data);
      return result.data;
    } catch (error: any) {
      //서버 에러 메세지 받아오기 -개선 필요
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

//판매자 상품 수정
export const fetchPutSellerItem = createAsyncThunk(
  "seller/fetchPutSellerItem",
  async ({
    TOKEN,
    product_id,
    formValues,
  }: {
    TOKEN: string;
    product_id: number;
    formValues: ItemPostType;
  }) => {
    try {
      const config = {
        headers: {
          Authorization: `JWT ${TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const result = await axios.put(`${BASE_URL}/products/${product_id}/`, formValues, config);
      console.log(result.data);
      return result.data;
    } catch (error: any) {
      //서버 에러 메세지 받아오기 -개선 필요
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = "";
      state.modifyItemId = 0;
    },
    getModifyId: (state, action) => {
      state.modifyItemId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //상품 불러오기
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
    // 판매자 상품 삭제
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
    //판매자 상품 등록
    builder.addCase(fetchPostItem.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchPostItem.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.products = state.products.filter((item) => item.product_id !== action.payload);
    });
    builder.addCase(fetchPostItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
    });
    //판매자 상품 수정
    builder.addCase(fetchPutSellerItem.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchPutSellerItem.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.products = state.products
        .filter((item) => item.product_id !== action.payload)
        .splice(0, 0, action.payload);
    });
    builder.addCase(fetchPutSellerItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong";
    });
  },
});

export const getSellerStatus = (state: RootState) => state.seller.status;
export const selectSellerProducts = (state: RootState) => state.seller.products;

export const selectModifyId = (state: RootState) => state.seller.modifyItemId;
export const selectModifyItem = (state: RootState) =>
  state.seller.products.find((item) => item.product_id === state.seller.modifyItemId);

export const { reset, getModifyId } = sellerSlice.actions;
export default sellerSlice.reducer;
