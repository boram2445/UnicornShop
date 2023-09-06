import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

export const baseAPI = axios.create({
  baseURL: BASE_URL,
});

export const setAccessToken = () => {
  const userData = sessionStorage.getItem("userData");
  const token = userData ? JSON.parse(userData).token : null;
  const userType = userData ? JSON.parse(userData).user_type : null;
  const userName = userData ? JSON.parse(userData).username : null;
  if (token) {
    baseAPI.defaults.headers.common["Authorization"] = `JWT ${token}`;
  }
  return { token, userType, userName };
};

export const removeAccessToken = () => {
  sessionStorage.clear();
};
