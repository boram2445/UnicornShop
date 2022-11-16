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
  nameStatus: string;
  registerStatus: string;
  loginStatus: string;
  error: string;
  message: string;
  userType: string;
}

const initialState: AuthSliceProps = {
  token: TOKEN ? TOKEN : null,
  nameStatus: "idle",
  registerStatus: "idle",
  loginStatus: "idle",
  error: "",
  message: "",
  userType: "BUYER",
};

//아이디 유효성 검증
export const fetchPostUserName = createAsyncThunk(
  "join/fetchPostUserName",
  async (username: string) => {
    try {
      const data = { username };
      const result = await axios.post(`${BASE_URL}/accounts/signup/valid/username/`, data);
      return result.data;
    } catch (error: any) {
      //사용자 에러 메세지 받아오기 -개선 필요
      console.log(error.response.data);
      return error.response.data;
    }
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
      console.log(error.response.data);
      return error.response.data;
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
    nameReset: (state) => {
      state.nameStatus = "idle";
      state.error = "";
      state.message = "";
    },
    registerReset: (state) => {
      state.registerStatus = "idle";
      state.error = "";
    },
    resetAll: (state) => {
      state.nameStatus = "idle";
      state.registerStatus = "idle";
      state.loginStatus = "idle";
      state.error = "";
      state.message = "";
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    //아이디 중복 확인
    builder.addCase(fetchPostUserName.pending, (state) => {
      state.nameStatus = "Loading";
    });
    builder.addCase(fetchPostUserName.fulfilled, (state, action) => {
      //가입에 실패해도 fulfilled상태로 실패 정보를 반환하기 때문에, 메세지 key에 따라 성공 여부를 판단하였다.
      state.nameStatus = action.payload.Success ? "succeeded" : "failed";
      state.message = action.payload.Success || action.payload.FAIL_Message;
    });
    builder.addCase(fetchPostUserName.rejected, (state, action) => {
      state.nameStatus = "failed";
      state.error = action.error.message || "Something is wrong in check id:<";
    });
    //회원가입
    builder.addCase(fetchPostRegister.pending, (state) => {
      state.registerStatus = "Loading";
    });
    builder.addCase(fetchPostRegister.fulfilled, (state, action) => {
      //가입에 실패해도 fulfilled상태로 실패 정보를 반환하기 때문에, username값을 반환하는지에 따라 성공 여부를 판단해주었다.
      const result = action.payload.username ? "succeeded" : "failed";
      state.registerStatus = result;
      //error를 any로 처리해서 any로 설정할수밖에없었다. - 개선 필요
      state.error =
        result === "succeeded"
          ? ""
          : Object.values(action.payload)
              .map((e: any) => e.join().toString())
              .join("\n");
    });
    builder.addCase(fetchPostRegister.rejected, (state, action) => {
      state.registerStatus = "failed";
      state.error = action.error.message || "Something is wrong in register:<";
    });
    //로그인
    builder.addCase(fetchPostLogin.pending, (state) => {
      state.loginStatus = "Loading";
    });
    builder.addCase(fetchPostLogin.fulfilled, (state, action) => {
      state.loginStatus = "succeeded";
      state.token = action.payload.token;
    });
    builder.addCase(fetchPostLogin.rejected, (state, action) => {
      state.loginStatus = "failed";
      state.error = action.error.message || "Something is wrong in Login:<";
      state.message = "아이디나 비밀번호가 잘못되었습니다:<";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
    });
  },
});

export const getToken = (state: RootState) => state.auth.token;
export const getNameStatus = (state: RootState) => state.auth.nameStatus;
export const getRegisterStatus = (state: RootState) => state.auth.registerStatus;
export const getLoginStatus = (state: RootState) => state.auth.loginStatus;
export const getError = (state: RootState) => state.auth.error;
export const getAuthMessage = (state: RootState) => state.auth.message;
export const selectUserType = (state: RootState) => state.auth.userType;
export const { registerReset, resetAll, setUserType } = authSlice.actions;
export default authSlice.reducer;
