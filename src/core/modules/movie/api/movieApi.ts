import { api } from 'core/http';

import { MovieDTO, MovieDTOPaging, MovieForm } from '../types/movieTypes';

// Без слеша в конце: в whitelist бэкенда "/api/v1/movies", "/api/v1/movies/" анониму не отдаётся
const moviesUrl = '/movies';

const movieApi = {
  getAllMovies: async () => {
    const response = await api.get<MovieDTO>(moviesUrl);
    return response.data;
  },
  getMovieById: async (id: number | string) => {
    const response = await api.get<MovieDTO>(`${moviesUrl}/${id}`);
    return response.data.search[0];
  },
  getMoviesPage: async (page: number, size: number) => {
    const response = await api.get<MovieDTOPaging>(moviesUrl, {
      params: { page, size },
    });
    return response.data;
  },
  // Бэкенд ищет по подстроке без учёта регистра
  searchMoviesByTitle: async (title: string) => {
    const response = await api.get<MovieDTO>(moviesUrl, {
      params: { title },
    });
    return response.data.search;
  },
  searchMoviesPageable: async (title: string, size: number, page = 1) => {
    const response = await api.get<MovieDTOPaging>(moviesUrl, {
      params: { page, size, title },
    });
    return response.data.search;
  },
  createMovie: async (movieItem: MovieForm) => {
    return await api.post<unknown>(moviesUrl, movieItem);
  },
  deleteMovie: async (id: number | string) => {
    return await api.delete<unknown>(`${moviesUrl}/${id}`);
  },
  updateMovie: async (id: number, movieItem: Partial<MovieForm>) => {
    return await api.put<unknown>(`${moviesUrl}/${id}`, movieItem);
  },
};

export default movieApi;
