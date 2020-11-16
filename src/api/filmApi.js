import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://film-api-backend.herokuapp.com/movies/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

const filmApi = {
  instance: instance,
  getFilmsPage: async (page, size) => {
    return await instance.get(`/page=${page}/size=${size}`).then((res) => res.data);
  },

  getFilm: async (title) => {
    return await instance.get(`/find?title=${title}`).then((res) => res.data.search);
  },
};

export default filmApi;
