import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

const item = sessionStorage.getItem("token");
const TOKEN = item === null ? null : JSON.parse(item).token;
const USER_TYPE = item === null ? null : JSON.parse(item).user_type;

interface LoginPostData {
  username: string;
  password: string;
  login_type: string;
}

interface LoginState {
  token?: string | null;
  userType: string;
  status: string;
  error: string;
}

const initialState: LoginState = {
  token: TOKEN ? TOKEN : null,
  userType: USER_TYPE ? USER_TYPE : "BUYER",
  status: "idle",
  error: "",
};

//로그인
export const fetchPostLogin = createAsyncThunk(
  "login/fetchPostLogin",
  async ({ username, password, login_type }: LoginPostData, { rejectWithValue }) => {
    try {
      const data = { username, password, login_type };
      const result = await axios.post(`${BASE_URL}/accounts/login/`, data);

      if (result.data) {
        sessionStorage.setItem("token", JSON.stringify(result.data));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.FAIL_Message);
    }
  }
);

//로그아웃
export const logout = createAsyncThunk("login/logout", async () => {
  sessionStorage.removeItem("token");
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    //로그인
    builder.addCase(fetchPostLogin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.token || "";
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
      state.token = null;
    });
  },
});

export const getToken = (state: RootState) => state.login.token;
export const getLoginStatus = (state: RootState) => state.login.status;
export const getLoginError = (state: RootState) => state.login.error;
export const getLoginUserType = (state: RootState) => state.login.userType;

export const { setLoginUserType } = loginSlice.actions;

export default loginSlice.reducer;
