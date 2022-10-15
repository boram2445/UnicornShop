import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../features/productSlice";
import cartSliceReducer from "../features/postCartSlice";
import cartListSliceReducer from "../features/cartListSlice";
import joinSliceReducer from "../features/joinSlice";

//state 저장소
const store = configureStore({
  reducer: {
    products: productSliceReducer,
    cart: cartSliceReducer,
    cartList: cartListSliceReducer,
    join: joinSliceReducer,
  },
});

export default store;
//state 타입 export
export type RootState = ReturnType<typeof store.getState>;
//dispatch 타입 export
export type AppDispatch = typeof store.dispatch;
