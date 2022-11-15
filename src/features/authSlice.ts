import { RootState } from "../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

const item = localStorage.getItem("token");
const TOKEN = item === null ? null : JSON.parse(item);
console.log(TOKEN);

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
  status: string;
  nameStatus: string;
  error: string;
  message: string;
}

const initialState: AuthSliceProps = {
  token: TOKEN ? TOKEN : null,
  status: "",
  nameStatus: "",
  error: "",
  message: "",
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
      state.status = "idle";
      state.nameStatus = "idle";
      state.error = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostUserName.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchPostUserName.fulfilled, (state) => {
      state.status = "succeeded";
      state.nameStatus = "succeeded";
      state.message = "사용 가능한 아이디 입니다 :)";
    });
    builder.addCase(fetchPostUserName.rejected, (state, action) => {
      state.status = "failed";
      state.nameStatus = "failed";
      state.error = action.error.message || "Something is wrong in check id:<";
      state.message = "이미 사용중인 아이디 입니다 :<";
    });
    builder.addCase(fetchPostRegister.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchPostRegister.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(fetchPostRegister.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong in register:<";
    });
    builder.addCase(fetchPostLogin.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchPostLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.token;
    });
    builder.addCase(fetchPostLogin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something is wrong in Login:<";
      state.message = "아이디나 비밀번호가 잘못되었습니다:<";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
    });
  },
});

export const getAuthStatus = (state: RootState) => state.auth.status;
export const getUserNameStatus = (state: RootState) => state.auth.nameStatus;
export const getAuthMessage = (state: RootState) => state.auth.message;
export const getToken = (state: RootState) => state.auth.token;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
