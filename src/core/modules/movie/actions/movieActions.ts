import { Dispatch } from 'redux';

import movieApi from '../api/movieApi';
import { MovieAction, MovieActionTypes } from '../reducers/movieReducer';
import { Movie } from '../types/movieTypes';

export const fetchAllMovies = () => async (dispatch: Dispatch<MovieAction>) => {
  dispatch({ type: MovieActionTypes.SET_LOADED, payload: false });

  const { search, totalResults } = await movieApi.getAllMovies();

  dispatch({
    type: MovieActionTypes.SET_MOVIES,
    payload: {
      items: [...search],
      totalItems: totalResults,
    },
  });
};

export const fetchMovies =
  (page = 1, size = 16) =>
  async (dispatch: Dispatch<MovieAction>) => {
    dispatch({ type: MovieActionTypes.SET_LOADED, payload: false });

    const { search, totalResults } = await movieApi.getMoviesPage(page, size);

    dispatch({
      type: MovieActionTypes.SET_MOVIES,
      payload: {
        items: [...search],
        totalItems: totalResults,
      },
    });
  };

export const fetchMovieByTitle =
  (title: string) => async (dispatch: Dispatch<MovieAction>) => {
    const film = await movieApi.searchMoviesByTitle(title);

    dispatch({
      type: MovieActionTypes.SET_ACTIVE_MOVIE,
      payload: { ...film[0] },
    });
  };

export const setActiveMovie = (payload: Movie | null) => ({
  type: MovieActionTypes.SET_ACTIVE_MOVIE,
  payload,
});

export const setSearchText = (payload: string) => ({
  type: MovieActionTypes.SET_SEARCH_TEXT,
  payload,
});

export const setSearchItems = (payload: Movie[]) => ({
  type: MovieActionTypes.SET_SEARCH_ITEMS,
  payload,
});

export const fetchSearchFilmsByTitle =
  (payload: string) => async (dispatch: Dispatch<MovieAction>) => {
    const data = await movieApi.searchMoviesPageable(payload, 10);

    dispatch({
      type: MovieActionTypes.SET_SEARCH_ITEMS,
      payload: data,
    });
  };

export const setPage = (payload: number) => ({
  type: MovieActionTypes.SET_PAGE,
  payload,
});

export const setPageSize = (payload: number) => ({
  type: MovieActionTypes.SET_PAGE_SIZE,
  payload,
});
