import { api } from 'core/http';

import type {
  AuthenticationRequest,
  AuthenticationResponse,
} from '../types/usersTypes';

const loginApi = {
  login: async (body: AuthenticationRequest) =>
    await api.post<AuthenticationResponse>('/auth/login', body),
};

export default loginApi;
