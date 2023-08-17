import { ActionReducerMapBuilder, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkFulfilledActionCreator } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { CartList } from "../types/cart";
import { RequestStatus } from "../types/slice";

// export function successBuilder<T extends { postStatus: string; error: string }, U>(
//   builder: ActionReducerMapBuilder<T>,
//   fulfilled: AsyncThunkFulfilledActionCreator<any, U, any>,
//   statusKey: string,
//   callback?: (state: any, action: any) => void
// ) {
//   builder.addCase(fulfilled, (state: any, action) => {
//     state[statusKey] = "succeeded";
//     state.error = "";
//     callback?.(state, action);
//   });
// }

// successBuilder<CartList, CartPost>(builder, fetchPostCart.fulfilled, "postStatus");

// successBuilder<CartList, string>(
//   builder,
//   fetchGetCartList.fulfilled,
//   "status",
//   (state, action) => {
//     state.cartItems = action.payload.results;
//   }
// );

type CartStatus = "status" | "postStatus" | "detailStatus";

export const setStatusAndError = (
  state: CartList,
  status: RequestStatus,
  targetStatus: CartStatus,
  error?: string
) => {
  state[targetStatus] = status;
  state.error = error || "";
};
