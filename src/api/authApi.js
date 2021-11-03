import axios from 'axios';
import { endPoint } from '../config';

const instance = axios.create({
  baseURL: endPoint.auth,
});

const authApi = {
  login: async (data) => await instance.post('/login', data),
};

export default authApi;
