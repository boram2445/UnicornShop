import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "./reducers/getProductSlice";
import detailSliceReducer from "./reducers/getDetailSlice";
import cartSliceReducer from "./reducers/postCartSlice";
import cartListSliceReducer from "./reducers/getCartListSlice";
//state 저장소
const store = configureStore({
  reducer: {
    products: productSliceReducer,
    detail: detailSliceReducer,
    cart: cartSliceReducer,
    cartList: cartListSliceReducer,
  },
});

export default store;
//state 타입 export
export type RootState = ReturnType<typeof store.getState>;
//dispatch 타입 export
export type AppDispatch = typeof store.dispatch;
