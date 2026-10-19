import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userApi,
  currentUserQuery,
  useSessionStore,
  endSession,
  type AuthenticationRequest,
} from "entities/user";
import { setCookie } from "shared/lib/cookie";

export const useLogin = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (body: AuthenticationRequest) => {
      endSession(client);
      const generation = useSessionStore.getState().generation;
      try {
        const response = await userApi.login(body);
        if (generation !== useSessionStore.getState().generation) {
          throw new Error("Вход отменён");
        }
        setCookie("token", response.token);
        const user = await client.fetchQuery(currentUserQuery(generation));
        useSessionStore.getState().confirm(generation);
        return user;
      } catch (error) {
        if (generation === useSessionStore.getState().generation) {
          endSession(client);
        }
        throw error;
      }
    },
  });
};
