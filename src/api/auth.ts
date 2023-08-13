import { JoinPost, LoginPost } from "../types/auth";
import { baseAPI } from "./baseInstance";

export const login = async (data: LoginPost, { rejectWithValue }: { rejectWithValue: any }) => {
  try {
    const { username } = data;
    const result = await baseAPI.post(`/accounts/login/`, data);

    if (result.data) {
      sessionStorage.setItem("userData", JSON.stringify({ username, ...result.data }));
    }
    return { username, ...result.data };
  } catch (error: any) {
    return rejectWithValue(error.response.data.FAIL_Message);
  }
};

export const join = async (
  { userType, userData }: { userType: string; userData: JoinPost },
  { rejectWithValue }: { rejectWithValue: any }
) => {
  const url = userType === "BUYER" ? `/accounts/signup/` : `/accounts/signup_seller/`;

  try {
    const data = userData;
    const result = await baseAPI.post(url, data);
    return result.data;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
};

export const checkUserName = async (
  username: string,
  { rejectWithValue }: { rejectWithValue: any }
) => {
  try {
    const data = { username };
    const result = await baseAPI.post(`/accounts/signup/valid/username/`, data);
    return result.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.FAIL_Message);
  }
};

export const checkCompanyNumber = async (
  number: string,
  { rejectWithValue }: { rejectWithValue: any }
) => {
  try {
    const data = { company_registration_number: number };
    const result = await baseAPI.post(`/accounts/signup/valid/company_registration_number/`, data);
    console.log(result.data);
    return result.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.FAIL_Message);
  }
};
