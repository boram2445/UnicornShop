import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../reducers/productSlice";
import cartSliceReducer from "../reducers/postCartSlice";
import cartListSliceReducer from "../reducers/cartListSlice";
import joinSliceReducer from "../reducers/joinSlice";

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
