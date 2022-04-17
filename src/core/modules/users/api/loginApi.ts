import { api } from 'core/http';

import type { AuthenticationRequest } from '../types/usersTypes';

const loginApi = {
  login: async (body: AuthenticationRequest) =>
    await api.post('/auth/login', body),
};

export default loginApi;
