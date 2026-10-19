import { isAxiosError } from "axios";

/** Текст ошибки для пользователя: message из ErrorMessage бэкенда или текст ответа */
const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (typeof data === "string" && data) {
      return data;
    }
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

export { getErrorMessage };
