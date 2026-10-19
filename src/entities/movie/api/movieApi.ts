import { api } from "shared/api";

import { MovieDTO, MovieDTOPaging, MovieForm } from "../model/types";

// Без слеша в конце: в whitelist бэкенда "/api/v1/movies", "/api/v1/movies/" анониму не отдаётся
const moviesUrl = "/movies";

const movieApi = {
  getAllMovies: async (signal?: AbortSignal) => {
    const response = await api.get<MovieDTO>(moviesUrl, { signal });
    return response.data;
  },
  getMovieById: async (id: number | string, signal?: AbortSignal) => {
    const response = await api.get<MovieDTO>(`${moviesUrl}/${id}`, { signal });
    const movie = response.data.search[0];
    if (!movie) {
      throw new Error("Фильм не найден");
    }
    return movie;
  },
  getMoviesPage: async (page: number, size: number, signal?: AbortSignal) => {
    const response = await api.get<MovieDTOPaging>(moviesUrl, {
      params: { page, size },
      signal,
    });
    return response.data;
  },
  // Бэкенд ищет по подстроке без учёта регистра
  searchMoviesByTitle: async (title: string, signal?: AbortSignal) => {
    const response = await api.get<MovieDTO>(moviesUrl, {
      params: { title },
      signal,
    });
    return response.data.search;
  },
  searchMoviesPageable: async (
    title: string,
    size: number,
    page = 1,
    signal?: AbortSignal
  ) => {
    const response = await api.get<MovieDTOPaging>(moviesUrl, {
      params: { page, size, title },
      signal,
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
