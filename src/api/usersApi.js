import axios from 'axios';
import { endPoint } from '../config';
import { getCookie } from '../services/cookieHelper';

const instance = axios.create({
  baseURL: endPoint.users,
});

const usersApi = {
  getUsers: async () => {
    // TODO Подумать как обойти необходимость в каждом запросе актуализировать токен
    const token = getCookie('token');
    const response = await instance.get('', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getCurrentUser: (token) => {
    return instance.get('/current', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  registerUser: (data) => {
    return instance.post('/register', data);
  },
  updateUser: async ({ id, ...data }) => {
    const token = getCookie('token');
    await instance.put(`${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // todo узнать что возращает апи
  },
};

export default usersApi;
