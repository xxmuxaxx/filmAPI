import { Dispatch } from "redux";

import movieApi from "../api/movieApi";
import { MovieAction, MovieActionTypes } from "../reducers/movieReducer";
import { Movie } from "../types/movieTypes";
import { CatalogRoute } from "core/helpers/catalogRouting";

export const fetchCatalog =
  (route: CatalogRoute, signal: AbortSignal) =>
  async (dispatch: Dispatch<MovieAction>) => {
    dispatch({ type: MovieActionTypes.SET_LOADED, payload: false });
    let items: Movie[];
    let totalItems: number;
    let page = route.page;
    if (route.type !== "all" || route.q) {
      const movies = route.q
        ? await movieApi.searchMoviesByTitle(route.q, signal)
        : (await movieApi.getAllMovies(signal)).search;
      const filtered = movies.filter(
        (movie) => route.type === "all" || movie.type === route.type
      );
      totalItems = filtered.length;
      page = Math.min(page, Math.max(1, Math.ceil(totalItems / route.size)));
      items = filtered.slice((page - 1) * route.size, page * route.size);
    } else {
      let result = await movieApi.getMoviesPage(page, route.size, signal);
      totalItems = result.totalResults;
      page = Math.min(page, Math.max(1, Math.ceil(totalItems / route.size)));
      if (page !== route.page)
        result = await movieApi.getMoviesPage(page, route.size, signal);
      items = result.search;
    }
    if (signal.aborted) return null;
    dispatch({
      type: MovieActionTypes.SET_MOVIES,
      payload: { items, totalItems },
    });
    return { page };
  };

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

    try {
      const { search, totalResults } = await movieApi.getMoviesPage(page, size);

      dispatch({
        type: MovieActionTypes.SET_MOVIES,
        payload: {
          items: [...search],
          totalItems: totalResults,
        },
      });
    } catch (error) {
      // Без этого лоадер на странице фильмов крутится бесконечно
      console.error(error);
      dispatch({
        type: MovieActionTypes.SET_MOVIES,
        payload: { items: [], totalItems: 0 },
      });
    }
  };

export const fetchMovieByTitle =
  (title: string, signal?: AbortSignal) =>
  async (dispatch: Dispatch<MovieAction>) => {
    try {
      // URL должен открывать только фильм с точным совпадением названия.
      const films = await movieApi.searchMoviesByTitle(title, signal);
      const film = films.find(
        (f) => f.title.toLowerCase() === title.toLowerCase()
      );

      if (signal?.aborted) return null;
      if (film) {
        dispatch({ type: MovieActionTypes.SET_ACTIVE_MOVIE, payload: film });
      }
      return film ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
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
    try {
      const data = await movieApi.searchMoviesPageable(payload, 10);
      dispatch({ type: MovieActionTypes.SET_SEARCH_ITEMS, payload: data });
    } catch {
      // Ошибка подсказок не должна мешать переходу к полному поиску.
      dispatch({ type: MovieActionTypes.SET_SEARCH_ITEMS, payload: [] });
    }
  };

export const setPage = (payload: number) => ({
  type: MovieActionTypes.SET_PAGE,
  payload,
});

export const setPageSize = (payload: number) => ({
  type: MovieActionTypes.SET_PAGE_SIZE,
  payload,
});
