import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Slice } from "../types/slice";
import { checkCompanyNumber, checkUserName, join } from "../api/auth";

type JoinSlice = Slice & {
  userType: string;

  nameStatus: string;
  nameMessage: string;

  companyNumberStatus: string;
  companyMessage: string;
};

const initialState: JoinSlice = {
  status: "idle",
  error: "",

  userType: "BUYER",
  nameStatus: "idle",
  nameMessage: "",
  companyNumberStatus: "idle",
  companyMessage: "",
};

export const fetchPostUserName = createAsyncThunk("register/fetchPostUserName", checkUserName);
export const fetchPostCompanyNumber = createAsyncThunk(
  "register/fetchPostCompanyNumber",
  checkCompanyNumber
);
export const fetchPostRegister = createAsyncThunk("register/fetchPostJoinBuyer", join);

export const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {
    resetAll: () => initialState,
    resetName: (state) => {
      state.nameStatus = "idle";
      state.nameMessage = "";
    },
    resetCompany: (state) => {
      state.companyNumberStatus = "idle";
      state.companyMessage = "";
    },
    resetRegister: (state) => {
      state.status = "idle";
      state.error = "";
    },
    setJoinUserType: (state, action) => {
      state.userType = action.payload;
      state.nameStatus = "idle";
      state.nameMessage = "";
      state.companyNumberStatus = "idle";
      state.companyMessage = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //아이디 중복 확인
    builder.addCase(fetchPostUserName.pending, (state) => {
      state.nameStatus = "loading";
      state.nameMessage = "";
      state.error = "";
    });
    builder.addCase(fetchPostUserName.fulfilled, (state, action) => {
      state.nameStatus = "succeeded";
      state.nameMessage = action.payload.Success;
    });
    builder.addCase(fetchPostUserName.rejected, (state, action) => {
      state.nameStatus = "failed";
      if (action.payload) {
        state.nameMessage = action.payload as string;
      } else {
        state.error = action.error.message || "Something is wrong in company number:<";
      }
    });
    //사업자등록번호 검증
    builder.addCase(fetchPostCompanyNumber.pending, (state) => {
      state.companyNumberStatus = "loading";
    });
    builder.addCase(fetchPostCompanyNumber.fulfilled, (state, action) => {
      state.companyNumberStatus = "succeeded";
      state.companyMessage = action.payload.Success;
    });
    builder.addCase(fetchPostCompanyNumber.rejected, (state, action) => {
      state.companyNumberStatus = "failed";
      if (action.payload) {
        state.companyMessage = action.payload as string;
      } else {
        state.error = action.error.message || "Something is wrong in company number:<";
      }
    });
    //회원가입 - 구매자
    builder.addCase(fetchPostRegister.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostRegister.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(fetchPostRegister.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.error = Object.values(action.payload as any)
          .map((message: any) => message.join().toString())
          .join("\n");
      } else {
        state.error = action.error.message || "Something is wrong in Register:<";
      }
    });
  },
});

export const getJoinState = (state: RootState) => state.register;
export const getJoinUserType = (state: RootState) => state.register.userType;

export const { resetAll, resetName, resetCompany, resetRegister, setJoinUserType } =
  registerSlice.actions;
export default registerSlice.reducer;
