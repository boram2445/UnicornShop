import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

interface JoinSliceProps {
  status: string;
  error: string;
  joinValue: {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
    email: string;
  };
}

const initialState: JoinSliceProps = {
  status: "idle",
  error: "",
  joinValue: {
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    email: "",
  },
};

export const fetchPostUserName = createAsyncThunk(
  "join/fetchPostUserName",
  async (username: string) => {
    const data = { username };
    const result = await axios.post(`${BASE_URL}/accounts/signup/valid/username/`, data);
    return result.data;
  }
);

export const joinSlice = createSlice({
  name: "join",
  initialState,
  reducers: {
    resetUsernameStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostUserName.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = "사용 가능한 아이디 입니다 :)";
    });
    builder.addCase(fetchPostUserName.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message?.includes("400")
        ? "이미 사용중인 아이디 입니다 :<"
        : "알 수 없는 에러";
    });
  },
});

export const getUserNameStatus = (state: RootState) => state.join.status;
export const getUserNameError = (state: RootState) => state.join.error;
export const { resetUsernameStatus } = joinSlice.actions;
export default joinSlice.reducer;
