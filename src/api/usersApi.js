import axios from 'axios';
import { endPoint } from '../config';

const instance = axios.create({
  baseURL: endPoint.users,
});

const usersApi = {
  getCurrentUser: (token) => {
    return instance.get('/current', {
      headers: { Authorization: `${token}` },
    });
  },
  registerUser: (data) => {
    return instance.post('/register', data);
  },
  updateUser: async ({ id, ...data }) => {
    await instance.put(`${id}`, data);
    // todo узнать что возращает апи
    return data;
  },
};

export default usersApi;
