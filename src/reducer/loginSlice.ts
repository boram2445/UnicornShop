import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Slice } from "../types/slice";
import { login } from "../api/auth";
import { LoginPost } from "../types/auth";
import { handleAsyncThunkError } from "../utils/slice";

type LoginSlice = Slice;

const initialState: LoginSlice = {
  status: "idle",
  error: "",
};

export const fetchPostLogin = createAsyncThunk(
  "login/fetchPostLogin",
  async (data: LoginPost, { rejectWithValue }) => {
    try {
      return await login(data);
    } catch (err: any) {
      return handleAsyncThunkError(err, rejectWithValue, "FAIL_Message");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: () => initialState,
    logout: (state) => {
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //로그인
    builder
      .addCase(fetchPostLogin.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchPostLogin.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchPostLogin.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = (action.payload as string) && "아이디 또는 패스워드가 일치하지 않습니다.";
        } else {
          state.error = action.error.message || "Something is wrong in Login:<";
        }
      });
  },
});

export const getAuthState = (state: RootState) => state.login;
export const { reset, logout } = loginSlice.actions;

export default loginSlice.reducer;
