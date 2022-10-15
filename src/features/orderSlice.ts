import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIyIiwiZXhwIjoxNjY1OTgyNjQ4fQ.MlGGZy8nMKNX9UnxsI2K_puyPWygnIhB-aC5gQjJc4U";

// //카트 주문 생성
// export const fetchPostCartOrder = createAsyncThunk(
//   "order/fetchPostCartOrder",

// )
