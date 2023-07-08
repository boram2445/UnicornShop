import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

//회원가입 타입
export interface RegisterPostData {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
  email?: string;
  company_registration_number?: string;
  store_name?: string;
}

interface RegisterSatate {
  registerStatus: string;
  error: string;
  userType: string;
  nameStatus: string;
  nameMessage: string;
  companyNumberStatus: string;
  companyMessage: string;
}

const initialState: RegisterSatate = {
  registerStatus: "idle",
  error: "",
  userType: "BUYER",
  nameStatus: "idle",
  nameMessage: "",
  companyNumberStatus: "idle",
  companyMessage: "",
};

//아이디 유효성 검증
export const fetchPostUserName = createAsyncThunk(
  "register/fetchPostUserName",
  async (username: string, { rejectWithValue }) => {
    try {
      const data = { username };
      const result = await axios.post(`${BASE_URL}/accounts/signup/valid/username/`, data);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.FAIL_Message);
    }
  }
);

//사업자 등록번호 검증
export const fetchPostCompanyNumber = createAsyncThunk(
  "register/fetchPostCompanyNumber",
  async (number: string, { rejectWithValue }) => {
    try {
      const data = { company_registration_number: number };
      const result = await axios.post(
        `${BASE_URL}/accounts/signup/valid/company_registration_number/`,
        data
      );
      console.log(result.data);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.FAIL_Message);
    }
  }
);

//회원가입
export const fetchPostRegister = createAsyncThunk(
  "register/fetchPostJoinBuyer",
  async (
    { userType, userData }: { userType: string; userData: RegisterPostData },
    { rejectWithValue }
  ) => {
    const url =
      userType === "BUYER" ? `${BASE_URL}/accounts/signup/` : `${BASE_URL}/accounts/signup_seller/`;

    try {
      const data = userData;
      const result = await axios.post(url, data);
      return result.data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

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
      state.registerStatus = "idle";
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
      state.registerStatus = "loading";
    });
    builder.addCase(fetchPostRegister.fulfilled, (state) => {
      state.registerStatus = "succeeded";
    });
    builder.addCase(fetchPostRegister.rejected, (state, action) => {
      state.registerStatus = "failed";
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
