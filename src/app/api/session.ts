import { setSessionExpiredHandler } from "shared/api";
import { getCookie } from "shared/lib/cookie";
import { endSession } from "entities/user";
import { queryClient } from "../providers/queryClient";

setSessionExpiredHandler((token) => {
  // 401 от старого аккаунта не завершает уже открытую новую сессию.
  if (getCookie("token") === token) {
    endSession(queryClient);
  }
});
