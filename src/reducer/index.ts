import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartListReducer from "./cartListSlice";
import modalReducer from "./modalSlice";
import orderReducer from "./orderSlice";
import sellerReducer from "./sellerSlice";
import loginReducer from "./loginSlice";
import registerReducer from "./joinSlice";
import searchReducer from "./searchSlice";
import detailReducer from "./detailSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    products: productReducer,
    cartList: cartListReducer,
    modal: modalReducer,
    order: orderReducer,
    seller: sellerReducer,
    search: searchReducer,
    detail: detailReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
