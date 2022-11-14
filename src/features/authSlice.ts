import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";
const TOKEN = JSON.parse(localStorage.getItem("token") || "{}");

//회원가입 타입
interface RegisterProps {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
  email?: string;
}

//로그인 타입
interface LoginProps {
  username: string;
  password: string;
  login_type: string;
}
interface AuthSliceProps {
  token?: string | null;
  nameStatus: string;
  registerStatus: string;
  loginStatus: string;
  error: string;
  usernameMessage: string;
  loginMessage: string;
  registerValue: RegisterProps;
}

const initialState: AuthSliceProps = {
  token: TOKEN ? TOKEN : null,
  nameStatus: "idle",
  registerStatus: "idle",
  loginStatus: "idle",
  error: "",
  usernameMessage: "",
  loginMessage: "",
  registerValue: {
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
export const fetchPostRegister = createAsyncThunk(
  "auth/fetchPostRegister",
  async ({ username, password, password2, phone_number, name }: RegisterProps) => {
    try {
      const data = { username, password, password2, phone_number, name };
      const result = await axios.post(`${BASE_URL}/accounts/signup/`, data);
      console.log(result.data);
      return result.data;
    } catch (error: any) {
      //사용자 에러 메세지 받아오기 -개선 필요
      console.log(error.response);
      alert("이미 등록된 전화번호 입니다.");
    }
  }
);

//로그인
export const fetchPostLogin = createAsyncThunk(
  "auth/fetchPostLogin",
  async ({ username, password, login_type }: LoginProps) => {
    const data = { username, password, login_type };
    const result = await axios.post(`${BASE_URL}/accounts/login/`, data);
    console.log(result.data);

    if (result.data) {
      localStorage.setItem("token", JSON.stringify(result.data.token));
    }

    return result.data;
  }
);

//로그아웃
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.nameStatus = "idle";
      state.registerStatus = "idle";
      state.error = "";
      state.usernameMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostUserName.fulfilled, (state) => {
      state.nameStatus = "succeeded";
      state.usernameMessage = "사용 가능한 아이디 입니다 :)";
    });
    builder.addCase(fetchPostUserName.rejected, (state, action) => {
      state.nameStatus = "failed";
      state.error = action.error.message || "Something is wrong in check id:<";
      state.usernameMessage = action.error.message?.includes("400")
        ? "이미 사용중인 아이디 입니다 :<"
        : "에러";
    });
    builder.addCase(fetchPostRegister.fulfilled, (state) => {
      state.registerStatus = "succeeded";
    });
    builder.addCase(fetchPostRegister.rejected, (state, action) => {
      state.registerStatus = "failed";
      state.error = action.error.message || "Something is wrong in register:<";
    });
    builder.addCase(fetchPostLogin.fulfilled, (state) => {
      state.loginStatus = "succeeded";
      state.token = TOKEN;
    });
    builder.addCase(fetchPostLogin.rejected, (state, action) => {
      state.loginStatus = "failed";
      state.error = action.error.message || "Something is wrong in Login:<";
      state.loginMessage = action.error.message?.includes("400")
        ? "아이디나 비번이 잘못되었습니다."
        : "에러";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
    });
  },
});

export const getUserNameStatus = (state: RootState) => state.auth.nameStatus;
export const getUserNameMessage = (state: RootState) => state.auth.usernameMessage;
export const getRegisterStatus = (state: RootState) => state.auth.registerStatus;
export const getLoginStatus = (state: RootState) => state.auth.loginStatus;
export const getLoginMessage = (state: RootState) => state.auth.loginMessage;
export const getToken = (state: RootState) => state.auth.token;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
