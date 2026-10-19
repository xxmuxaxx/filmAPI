import {
  queryOptions,
  useQuery,
  type QueryClient,
} from "@tanstack/react-query";
import { getCookie, deleteCookie } from "shared/lib/cookie";
import { userApi } from "./userApi";
import { toCurrentUser } from "../model/currentUser";
import { useSessionStore } from "../model/sessionStore";

export const userKeys = {
  all: ["user"] as const,
  current: (generation: number) => ["user", "current", generation] as const,
};

export const currentUserQuery = (generation: number) =>
  queryOptions({
    queryKey: userKeys.current(generation),
    queryFn: async ({ signal }) => {
      const user = await userApi.current(signal);
      if (
        generation !== useSessionStore.getState().generation ||
        !getCookie("token")
      ) {
        throw new Error("Сессия завершена");
      }
      return toCurrentUser(user);
    },
    meta: { private: true },
    retry: false,
  });

export const useCurrentUser = () => {
  const phase = useSessionStore((state) => state.phase);
  const generation = useSessionStore((state) => state.generation);
  return useQuery({
    ...currentUserQuery(generation),
    enabled: phase !== "guest",
  });
};

export const endSession = (client: QueryClient) => {
  deleteCookie("token");
  useSessionStore.getState().end();
  // Поколение меняется синхронно до отмены: поздний ответ не активирует старую сессию.
  void client.cancelQueries({
    predicate: (query) => query.meta?.private === true,
  });
  client.removeQueries({ predicate: (query) => query.meta?.private === true });
};
