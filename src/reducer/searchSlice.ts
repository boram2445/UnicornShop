import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Product } from "../types/product";
import { Slice } from "../types/slice";
import { getSearchProducts } from "../api/product";

type SearchSliceState = Slice & {
  quantity: number;
  sortType: string;
  postType: string;
  products: Product[];
};

const initialState: SearchSliceState = {
  status: "idle",
  error: "",
  quantity: 0,
  sortType: "latestDate",
  postType: "list",
  products: [],
};

export const fetchSearchProducts = createAsyncThunk(
  "search/fetchSearchProducts",
  getSearchProducts
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchReset: () => initialState,
    sortLatestDate(state) {
      state.products.sort(
        (prev, curr) => Date.parse(curr.created_at) - Date.parse(prev.created_at)
      );
      state.sortType = "latestDate";
    },
    sortLowerPrice(state) {
      state.products.sort((prev, curr) => prev.price - curr.price);
      state.sortType = "lowerPrice";
    },
    sortUpperPrice(state) {
      state.products.sort((prev, curr) => curr.price - prev.price);
      state.sortType = "upperPrice";
    },
    switchPostType(state, action) {
      state.postType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProducts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        const { results, count } = action.payload;
        state.status = "succeeded";
        state.quantity = count;
        state.products = results;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something is wrong";
      });
  },
});

export const getSearchState = (state: RootState) => state.search;

export const { searchReset, sortLatestDate, sortLowerPrice, sortUpperPrice, switchPostType } =
  searchSlice.actions;
export default searchSlice.reducer;
