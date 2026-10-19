import axios, { isAxiosError, type InternalAxiosRequestConfig } from "axios";
import { endPoint } from "shared/config";
import { getCookie } from "shared/lib/cookie";

type AuthRequestConfig = InternalAxiosRequestConfig & {
  anonymousRetry?: boolean;
  sentToken?: string;
};
type SessionExpiredHandler = (token: string) => void;
let onSessionExpired: SessionExpiredHandler = () => {};

// Подключается приложением до первого запроса. Транспорт не импортирует хранилища.
export const setSessionExpiredHandler = (handler: SessionExpiredHandler) => {
  onSessionExpired = handler;
};

export const api = axios.create({ baseURL: endPoint.baseUrl });

api.interceptors.request.use((request: AuthRequestConfig) => {
  const token = request.anonymousRetry ? undefined : getCookie("token");
  request.sentToken = token;
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  } else {
    request.headers.delete("Authorization");
  }
  return request;
});

api.interceptors.response.use(undefined, (error: unknown) => {
  if (!isAxiosError(error)) {
    return Promise.reject(error);
  }
  const request = error.config as AuthRequestConfig | undefined;
  if (
    error.response?.status === 401 &&
    request?.sentToken &&
    !request.anonymousRetry
  ) {
    onSessionExpired(request.sentToken);
    request.anonymousRetry = true;
    request.headers.delete("Authorization");
    return api.request(request);
  }
  return Promise.reject(error);
});
