import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AsyncThunkFulfilledActionCreator } from "@reduxjs/toolkit/dist/createAsyncThunk";

export function successBuilder<T extends { postStatus: string; error: string }, U>(
  builder: ActionReducerMapBuilder<T>,
  fulfilled: AsyncThunkFulfilledActionCreator<any, U, any>,
  statusKey: string,
  callback?: (state: any, action: any) => void
) {
  builder.addCase(fulfilled, (state: any, action) => {
    state[statusKey] = "succeeded";
    state.error = "";
    callback?.(state, action);
  });
}
