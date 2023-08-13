import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Slice } from "../types/slice";
import { login } from "../api/auth";
import { LoginPost } from "../types/auth";
import axios from "axios";

const item = sessionStorage.getItem("userData");
const TOKEN = item === null ? null : JSON.parse(item).token;
const USER_TYPE = item === null ? null : JSON.parse(item).user_type;
const USER_NAME = item === null ? null : JSON.parse(item).username;

type LoginSlice = Slice & {
  userName: string;
  userType: string;
  TOKEN?: string | null;
};

const initialState: LoginSlice = {
  userName: USER_NAME ? USER_NAME : "",
  userType: USER_TYPE ? USER_TYPE : "BUYER",
  TOKEN: TOKEN ? TOKEN : null,
  status: "idle",
  error: "",
};

export const fetchPostLogin = createAsyncThunk(
  "login/fetchPostLogin",
  async (data: LoginPost, { rejectWithValue }) => {
    try {
      return await login(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      } else {
        throw new Error("연결 문제 발생");
      }
    }
  }
);
export const logout = createAsyncThunk("login/logout", async () => {
  sessionStorage.clear();
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoginUserType: (state, action) => {
      state.userType = action.payload;
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //로그인
    builder.addCase(fetchPostLogin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.userName = action.payload.username;
      state.TOKEN = action.payload.token || "";
    });
    builder.addCase(fetchPostLogin.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.error = (action.payload as string) && "아이디 또는 패스워드가 일치하지 않습니다.";
      } else {
        state.error = action.error.message || "Something is wrong in Login:<";
      }
    });
    //로그아웃
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "idle";
      state.error = "";
      state.userName = "";
      state.TOKEN = null;
      state.userType = "BUYER";
    });
  },
});

export const getAuthState = (state: RootState) => state.login;
export const getToken = (state: RootState) => state.login.TOKEN;
export const getLoginUserType = (state: RootState) => state.login.userType;

export const { reset, setLoginUserType } = loginSlice.actions;

export default loginSlice.reducer;
