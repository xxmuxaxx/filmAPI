import { api } from 'core/http';

import {
  User,
  UserBaseBody,
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
    return api.post<unknown>('/users/register', data);
  },
  // Форма профиля отправляет только изменяемые поля
  updateUser: async ({
    id,
    ...data
  }: Pick<User, 'id'> & Partial<UserBaseBody>) => {
    await api.put<unknown>(`/users/${id}`, data);
  },
};

export default usersApi;
