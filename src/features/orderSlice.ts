import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

// //카트 주문 생성
// export const fetchPostCartOrder = createAsyncThunk(
//   "order/fetchPostCartOrder",

// )
