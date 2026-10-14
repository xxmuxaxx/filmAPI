import axios, { isAxiosError } from "axios";
import { endPoint } from "config";
import store from "core/configureStore";
import { deleteCookie, getCookie } from "core/helpers/cookieHelper";
import { UsersActionTypes } from "core/modules/users/reducers/userReducer";

const api = axios.create({
  baseURL: endPoint.baseUrl,
});

api.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Бэкенд отвечает 401 на любой запрос с просроченным токеном, даже на публичный.
// Поэтому при 401 с токеном выходим из профиля и повторяем запрос без токена.
api.interceptors.response.use(undefined, (error) => {
  if (
    isAxiosError(error) &&
    error.response?.status === 401 &&
    error.config?.headers.Authorization &&
    getCookie("token")
  ) {
    deleteCookie("token");
    store.dispatch({ type: UsersActionTypes.SET_CURRENT_USER, payload: null });
    return api.request(error.config);
  }
  return Promise.reject(error);
});

/** Текст ошибки для пользователя: message из ErrorMessage бэкенда или текст ответа */
const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (typeof data === "string" && data) return data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  }
  return error instanceof Error ? error.message : String(error);
};

export { api, getErrorMessage };
