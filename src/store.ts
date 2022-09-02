import { configureStore } from "@reduxjs/toolkit";
import getProductReducer from "./reducers/getProductSlice";
import getDetailReducer from "./reducers/getDetailSlice";

//state 저장소
const store = configureStore({
  reducer: {
    getProduct: getProductReducer,
    getDetail: getDetailReducer,
  },
});

export default store;
//state 타입 export
export type RootState = ReturnType<typeof store.getState>;
//dispatch 타입 export
export type AppDispatch = typeof store.dispatch;
