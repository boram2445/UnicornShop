import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import cartReducer from "../features/postCartSlice";
import cartListReducer from "../features/cartListSlice";
import joinReducer from "../features/joinSlice";
// import authReducer from "../features/auth/authSlice";

//state 저장소
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    cartList: cartListReducer,
    join: joinReducer,
    // auth: authReducer,
  },
});

export default store;
//state 타입 export
export type RootState = ReturnType<typeof store.getState>;
//dispatch 타입 export
export type AppDispatch = typeof store.dispatch;
