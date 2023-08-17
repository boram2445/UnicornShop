import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";

export const baseAPI = axios.create({
  baseURL: BASE_URL,
});

export const authConfig = (
  TOKEN?: string,
  contentType: "application/json" | "multipart/form-data" = "application/json"
) => {
  return {
    headers: {
      Authorization: `JWT ${TOKEN}`,
      "Content-Type": contentType,
    },
  };
};
