import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice";
import cartReducer from "../features/postCartSlice";
import cartListReducer from "../features/cartListSlice";
import modalReducer from "../features/modalSlice";
import orderReducer from "../features/orderSlice";

//state 저장소
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    cartList: cartListReducer,
    modal: modalReducer,
    order: orderReducer,
  },
});

export default store;
//state 타입 export
export type RootState = ReturnType<typeof store.getState>;
//dispatch 타입 export
export type AppDispatch = typeof store.dispatch;
