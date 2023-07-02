import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import cartReducer from "../features/postCartSlice";
import cartListReducer from "../features/cartListSlice";
import modalReducer from "../features/modalSlice";
import orderReducer from "../features/orderSlice";
import sellerReducer from "../features/sellerSlice";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import searchReducer from "../features/searchSlice";
import detailReducer from "../features/detailSlice";

//state 저장소
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    products: productReducer,
    cart: cartReducer,
    cartList: cartListReducer,
    modal: modalReducer,
    order: orderReducer,
    seller: sellerReducer,
    search: searchReducer,
    detail: detailReducer,
  },
});

export default store;
//state 타입 export
export type RootState = ReturnType<typeof store.getState>;
//dispatch 타입 export
export type AppDispatch = typeof store.dispatch;
