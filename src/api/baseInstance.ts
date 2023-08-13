import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

export const baseAPI = axios.create({
  baseURL: BASE_URL,
});
