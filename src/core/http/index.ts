import axios from "axios";
import { endPoint } from "config";
import { getCookie } from "core/helpers/cookieHelper";

const api = axios.create({
  baseURL: endPoint.baseUrl,
});

api.interceptors.request.use((config) => {
  if (getCookie("token")) {
    config.headers.Authorization = `Bearer ${getCookie("token")}`;
  }
  return config;
});

export { api };
