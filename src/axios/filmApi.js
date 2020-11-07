import axios from 'axios';

const filmApi = axios.create({
  baseURL: 'https://film-api-backend.herokuapp.com/movies/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default filmApi;
