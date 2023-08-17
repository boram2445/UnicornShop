import { JoinPost, LoginPost } from "../types/auth";
import { baseAPI } from "./baseInstance";

export const login = async (data: LoginPost) => {
  const { username } = data;
  const result = await baseAPI.post(`/accounts/login/`, data);
  result.data && sessionStorage.setItem("userData", JSON.stringify({ username, ...result.data }));
  return { username, ...result.data };
};

export const join = async ({ userType, userData }: { userType: string; userData: JoinPost }) => {
  const url = userType === "BUYER" ? `/accounts/signup/` : `/accounts/signup_seller/`;
  const result = await baseAPI.post(url, userData);
  return result.data;
};

export const checkUserName = async (username: string) => {
  const data = { username };
  const result = await baseAPI.post(`/accounts/signup/valid/username/`, data);
  return result.data;
};

export const checkCompanyNumber = async (number: string) => {
  const data = { company_registration_number: number };
  const result = await baseAPI.post(`/accounts/signup/valid/company_registration_number/`, data);
  return result.data;
};
