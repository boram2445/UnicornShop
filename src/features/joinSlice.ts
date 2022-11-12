import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

interface JoinSliceProps {
  status: string;
  error: string;
  usernameMessage: string;
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
  usernameMessage: "",
  joinValue: {
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    email: "",
  },
};

//아이디 유효성 검증
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
      state.usernameMessage = "사용 가능한 아이디 입니다 :)";
    });
    builder.addCase(fetchPostUserName.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong :<";
      state.usernameMessage = action.error.message?.includes("400")
        ? "이미 사용중인 아이디 입니다 :<"
        : "에러";
    });
  },
});

export const getUserNameStatus = (state: RootState) => state.join.status;
export const getUserNameMessage = (state: RootState) => state.join.usernameMessage;
export const { resetUsernameStatus } = joinSlice.actions;
export default joinSlice.reducer;
