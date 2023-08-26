import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { RequestStatus, Slice } from "../types/slice";
import { checkCompanyNumber, checkUserName, join } from "../api/auth";
import { JoinPost } from "../types/auth";
import { handleAsyncThunkError } from "../utils/slice";

type JoinSlice = Slice & {
  nameStatus: RequestStatus;
  companyNumberStatus: RequestStatus;
  nameMessage: string;
  companyMessage: string;
};

const initialState: JoinSlice = {
  status: "idle",
  error: "",
  nameStatus: "idle",
  companyNumberStatus: "idle",
  nameMessage: "",
  companyMessage: "",
};

export const fetchPostUserName = createAsyncThunk(
  "register/fetchPostUserName",
  async (data: string, { rejectWithValue }) => {
    try {
      return await checkUserName(data);
    } catch (err: any) {
      return handleAsyncThunkError(err, rejectWithValue, "FAIL_Message");
    }
  }
);
export const fetchPostCompanyNumber = createAsyncThunk(
  "register/fetchPostCompanyNumber",
  async (data: string, { rejectWithValue }) => {
    try {
      return await checkCompanyNumber(data);
    } catch (err: any) {
      return handleAsyncThunkError(err, rejectWithValue, "FAIL_Message");
    }
  }
);
export const fetchPostRegister = createAsyncThunk(
  "register/fetchPostRegister",
  async (data: { userType: string; userData: JoinPost }, { rejectWithValue }) => {
    try {
      return await join(data);
    } catch (err: any) {
      return handleAsyncThunkError(err, rejectWithValue);
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
      state.status = "idle";
      state.error = "";
    },
    setJoinUserType: (state) => {
      state.nameStatus = "idle";
      state.nameMessage = "";
      state.companyNumberStatus = "idle";
      state.companyMessage = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //아이디 중복 확인
    builder //
      .addCase(fetchPostUserName.pending, (state) => {
        state.nameStatus = "loading";
        state.nameMessage = "";
        state.error = "";
      })
      .addCase(fetchPostUserName.fulfilled, (state, action) => {
        state.nameStatus = "succeeded";
        state.nameMessage = action.payload.Success;
      })
      .addCase(fetchPostUserName.rejected, (state, action) => {
        state.nameStatus = "failed";
        if (action.payload) {
          state.nameMessage = action.payload as string;
        } else {
          state.error = action.error.message || "Something is wrong in id:<";
        }
      })
      //사업자등록번호 검증
      .addCase(fetchPostCompanyNumber.pending, (state) => {
        state.companyNumberStatus = "loading";
      })
      .addCase(fetchPostCompanyNumber.fulfilled, (state, action) => {
        state.companyNumberStatus = "succeeded";
        state.companyMessage = action.payload.Success;
      })
      .addCase(fetchPostCompanyNumber.rejected, (state, action) => {
        state.companyNumberStatus = "failed";
        if (action.payload) {
          state.companyMessage = action.payload as string;
        } else {
          state.error = action.error.message || "Something is wrong in company number:<";
        }
      })
      //회원가입 - 구매자
      .addCase(fetchPostRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostRegister.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchPostRegister.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          console.log(state.error);
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
export const { resetAll, resetName, resetCompany, resetRegister, setJoinUserType } =
  registerSlice.actions;
export default registerSlice.reducer;
