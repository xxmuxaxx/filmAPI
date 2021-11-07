import axios from 'axios';
import { endPoint } from '../config';
import { getCookie } from '../services/cookieHelper';

const instance = axios.create({
  baseURL: endPoint.users,
});

const usersApi = {
  getUsers: async () => {
    // TODO Подумать как обойти необходимость в каждом запросе актуализировать токен
    const token = getCookie('Authorization');
    const response = await instance.get('', {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  },
  getCurrentUser: (token) => {
    return instance.get('/current', {
      headers: { Authorization: `${token}` },
    });
  },
  registerUser: (data) => {
    return instance.post('/register', data);
  },
  updateUser: async ({ id, ...data }) => {
    const token = getCookie('Authorization');
    await instance.put(`${id}`, data, {
      headers: { Authorization: `${token}` },
    });
    // todo узнать что возращает апи
  },
};

export default usersApi;
