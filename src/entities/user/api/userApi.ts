import { api } from "shared/api";
import type {
  User,
  UserBaseBody,
  UserRegistrationBody,
  AuthenticationRequest,
  AuthenticationResponse,
} from "../model/types";

export const userApi = {
  current: async (signal?: AbortSignal) =>
    (await api.get<User>("/users/current", { signal })).data,
  login: async (body: AuthenticationRequest) =>
    (await api.post<AuthenticationResponse>("/auth/login", body)).data,
  register: async (body: UserRegistrationBody) => {
    await api.post("/users/register", body);
  },
  update: async ({ id, ...body }: Pick<User, "id"> & Partial<UserBaseBody>) => {
    await api.put(`/users/${id}`, body);
  },
};
