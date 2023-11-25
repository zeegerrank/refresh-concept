import axios from "axios";
import Cookies from "js-cookie";
import axiosError from "../handlers/axiosError.handler";

const api = axios.create({
  baseURL: "http://localhost:3500/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    axiosError(error);
  }
);

export default api;
