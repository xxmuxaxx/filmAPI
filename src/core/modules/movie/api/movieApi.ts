import { api } from 'core/http';

import { MovieDTO, MovieDTOPaging, MovieForm } from '../types/movieTypes';

const movieApi = {
  getAllMovies: async () => {
    const response = await api.get<MovieDTO>('/movies');
    return response.data;
  },
  getMovieById: async (id: number) => {
    const response = await api.get<MovieDTO>(`/movies/${id}`);
    return response.data.search[0];
  },
  getMoviesPage: async (page: number, size: number) => {
    const response = await api.get<MovieDTOPaging>(
      `/movies/?page=${page}&size=${size}`
    );
    return response.data;
  },
  searchMoviesByTitle: async (title: string) => {
    const response = await api.get<MovieDTOPaging>(`/movies/?title=${title}`);
    return response.data.search;
  },
  searchMoviesPageable: async (title: string, size: number, page = 1) => {
    const response = await api.get<MovieDTOPaging>(
      `/movies/?page=${page}&size=${size}&title=${title}`
    );
    return response.data.search;
  },
  createMovie: async (movieItem: MovieForm) => {
    return await api.post('/movies', movieItem);
  },
  deleteMovie: async (id: number) => {
    return await api.delete(`/movies/${id}`);
  },
  updateMovie: async (id: number, movieItem: MovieForm) => {
    return await api.put(`/movies/${id}`, movieItem);
  },
};

export default movieApi;
