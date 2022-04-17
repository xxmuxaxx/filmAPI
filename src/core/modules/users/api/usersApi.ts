import { api } from 'core/http';

import {
  User,
  UserBaseBodyWithId,
  UserRegistrationBody,
} from '../types/usersTypes';

const usersApi = {
  getUsers: async () => {
    const response = await api.get<User[]>('/users');
    return response;
  },
  getCurrentUser: async () => {
    const response = await api.get<User>('/users/current');
    return response;
  },
  registerUser: (data: UserRegistrationBody) => {
    return api.post('/users/register', data);
  },
  updateUser: async ({ id, ...data }: UserBaseBodyWithId) => {
    await api.put(`/users/${id}`, data);
  },
};

export default usersApi;
