import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

interface SignUpProps {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
  email?: string;
}
interface JoinSliceProps {
  status: string;
  error: string;
  usernameMessage: string;
  joinValue: SignUpProps;
}

const initialState: JoinSliceProps = {
  status: "idle",
  error: "",
  usernameMessage: "",
  joinValue: {
    username: "",
    password: "",
    password2: "",
    phone_number: "",
    name: "",
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

//회원가입
export const fetchPostSignUp = createAsyncThunk(
  "join/fetchPostSignUp",
  async ({ username, password, password2, phone_number, name }: SignUpProps) => {
    const data = { username, password, password2, phone_number, name };
    const result = await axios.post(`${BASE_URL}/accounts/signup`, data);
    return result.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
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
      state.error = action.error.message || "Something is wrong in check id:<";
      state.usernameMessage = action.error.message?.includes("400")
        ? "이미 사용중인 아이디 입니다 :<"
        : "에러";
    });
    builder.addCase(fetchPostSignUp.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(fetchPostSignUp.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong in sign up:<";
    });
  },
});

export const getUserNameStatus = (state: RootState) => state.auth.status;
export const getUserNameMessage = (state: RootState) => state.auth.usernameMessage;
export const { resetUsernameStatus } = authSlice.actions;
export default authSlice.reducer;
