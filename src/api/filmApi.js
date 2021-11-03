import axios from 'axios';
import { endPoint } from '../config';
import { getCookie } from '../services/cookieHelper';

const instance = axios.create({
  baseURL: endPoint.films,
});

const filmApi = {
  getAllFilms: async () => {
    const response = await instance.get('');

    return response.data;
  },
  getFilmById: async (id) => {
    const response = await instance.get(`${id}`);

    return response.data.search[0];
  },
  getFilmsPage: async (page, size) => {
    const response = await instance.get(`?page=${page}&size=${size}`);

    return response.data;
  },
  searchFilmsByTitle: async (title) => {
    const response = await instance.get(`?title=${title}`);

    return response.data.search;
  },
  searchFilmsPageable: async (title, size, page = 1) => {
    const response = await instance.get(
      `?page=${page}&size=${size}&title=${title}`
    );

    return response.data.search;
  },
  createFilm: (movieItem) => {
    const token = getCookie('Authorization');
    return instance.post('', movieItem, {
      headers: { Authorization: `${token}` },
    });
  },
  deleteFilm: (id) => {
    const token = getCookie('Authorization');
    return instance.delete(`${id}`, {
      headers: { Authorization: `${token}` },
    });
  },
  updateFilm: (id, movieItem) => {
    const token = getCookie('Authorization');
    return instance.put(`${id}`, movieItem, {
      headers: { Authorization: `${token}` },
    });
  },
};

export default filmApi;
