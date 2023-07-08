import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Product } from "./productSlice";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

export interface CartItem {
  my_cart: number;
  is_active: boolean;
  cart_item_id: number;
  product_id: number;
  quantity: number;
  isChecked: boolean;
  item: Product;
}

interface CountPutData {
  TOKEN: string;
  cart_item_id: number;
  product_id: number;
  quantity: number;
  is_active: boolean;
}

interface CartListState {
  status: string;
  postStatus: string;
  detailStatus: string;
  cartItems: CartItem[];
  totalPrice: number;
  deliveryPrice: number;
  error: string;
}

const initialState: CartListState = {
  status: "idle",
  postStatus: "idle",
  detailStatus: "idle",
  cartItems: [],
  totalPrice: 0,
  deliveryPrice: 0,
  error: "",
};

interface postCartType {
  TOKEN?: string;
  product_id?: number;
  quantity?: number;
  check?: boolean;
}

//카트 담기
export const fetchPostCart = createAsyncThunk(
  "cart/axiosPostCart",
  async ({ TOKEN, product_id, quantity, check }: postCartType) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const data = { product_id, quantity, check };
    const result = await axios.post(`${BASE_URL}/cart/`, data, config);
    return result.data;
  }
);

//카트 상품 가져오기
export const fetchGetCartList = createAsyncThunk(
  "cartList/fetchGetCartList",
  async (TOKEN: string) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const result = await axios.get(`${BASE_URL}/cart/`, config);
    return result.data;
  }
);

//카트 상품 삭제
export const fetchDeleteCartItem = createAsyncThunk(
  "cartList/fetchDeleteCartItem",
  async ({ TOKEN, cart_item_id }: { TOKEN: string; cart_item_id: number }) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    await axios.delete(`${BASE_URL}/cart/${cart_item_id}`, config);
    return cart_item_id;
  }
);

//상품 디테일
export const fetchGetAllDetail = createAsyncThunk(
  "cartList/fetchGetAllDetail",
  async (cartItems: CartItem[]) => {
    const promiseArr = [
      ...cartItems.map((item) => axios.get(`${BASE_URL}/products/${item.product_id}/`)),
    ];
    const cartDetails = await axios
      .all(promiseArr)
      .then(axios.spread((...responses) => responses.map((res) => res.data)));
    return { cartItems, cartDetails };
  }
);

//장바구니 수량 수정
export const fetchPutCartQuantity = createAsyncThunk(
  "cartList/fetchPutCartQuantity",
  async ({ TOKEN, product_id, quantity, cart_item_id, is_active }: CountPutData) => {
    const config = {
      headers: {
        Authorization: `JWT ${TOKEN}`,
      },
    };
    const data = { product_id, quantity, is_active };
    const result = await axios.put(`${BASE_URL}/cart/${cart_item_id}/`, data, config);
    return result.data;
  }
);

export const cartListSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    reset: () => initialState,
    //상품 체크 버튼
    checkItem: (state, { payload }) => {
      const { productId, isChecked } = payload;
      state.cartItems.forEach((item) => {
        if (item.product_id === productId)
          isChecked ? (item.isChecked = true) : (item.isChecked = false);
      });
    },
    //전체 상품 체크
    checkAllItem: (state, { payload }) => {
      const { isChecked } = payload;
      state.cartItems.map((item) => {
        isChecked ? (item.isChecked = true) : (item.isChecked = false);
      });
    },
    // 전체 가격 계산
    setTotalPrice: (state) => {
      let totalPrice = 0;
      let deliveryPrice = 0;
      state.cartItems.map((item) => {
        if (item.isChecked) {
          totalPrice += item.quantity * item.item.price;
          deliveryPrice += item.item.shipping_fee;
        }
      });
      state.totalPrice = totalPrice;
      state.deliveryPrice = deliveryPrice;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostCart.fulfilled, (state) => {
      state.postStatus = "succeeded";
      state.error = "";
    });
    builder.addCase(fetchPostCart.rejected, (state, action) => {
      state.postStatus = "failed";
      state.error = action.error.message || "Something is wrong";
    });
    builder.addCase(fetchGetCartList.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    //상품 가져오기
    builder.addCase(fetchGetCartList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cartItems = action.payload.results;
    });
    builder.addCase(fetchGetCartList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something was wrong";
    });
    //전체 디테일 가져오기
    builder.addCase(fetchGetAllDetail.pending, (state) => {
      state.detailStatus = "loading";
      state.error = "";
    });
    builder.addCase(fetchGetAllDetail.fulfilled, (state, action) => {
      state.detailStatus = "succeeded";
      const { cartItems, cartDetails } = action.payload;
      const res = cartItems.map((item, index) => ({
        ...item,
        item: cartDetails[index],
        isChecked: true,
      }));
      state.cartItems = res;
    });
    builder.addCase(fetchGetAllDetail.rejected, (state, action) => {
      state.detailStatus = "failed";
      state.error = action.error.message || "Something was wrong";
    });
    //상품 삭제
    builder.addCase(fetchDeleteCartItem.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      const deleteItemId = action.payload;
      const newCartItems = state.cartItems.filter((item) => item.cart_item_id !== deleteItemId);
      //가격 재 계산
      state.cartItems.forEach((item) => {
        if (item.cart_item_id === deleteItemId && item.isChecked)
          state.totalPrice -= item.quantity * item.item.price;
      });
      state.cartItems = newCartItems;
    });
    //장바구니 수량 수정
    builder.addCase(fetchPutCartQuantity.fulfilled, (state, action) => {
      state.status = "succeeded";
      const { product_id, quantity } = action.payload;
      state.cartItems.forEach((item) => {
        if (item.product_id === product_id) {
          if (item.isChecked) {
            state.totalPrice -= item.quantity * item.item.price;
            item.quantity = quantity;
            state.totalPrice += quantity * item.item.price;
          } else {
            item.quantity = quantity;
          }
        }
      });
    });
  },
});

export const getCartState = (state: RootState) => state.cartList;
export const getCartQuantity = (state: RootState) => state.cartList.cartItems.length;
export const selectCheckAllState = (state: RootState) =>
  state.cartList.cartItems.every((item) => item.isChecked === true);
export const selectCheckedItems = (state: RootState) =>
  state.cartList.cartItems.filter((item) => item.isChecked === true);

export const { reset, checkItem, checkAllItem, setTotalPrice } = cartListSlice.actions;
export default cartListSlice.reducer;
