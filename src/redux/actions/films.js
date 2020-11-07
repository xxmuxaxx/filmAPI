import filmApi from '../../axios/filmApi';

export const fetchFilms = (page = 1, size = 16) => (dispatch) => {
  dispatch({ type: 'SET_LOADED', payload: false });

  filmApi.get(`/page=${page}/size=${size}`).then(({ data }) => {
    dispatch(setFilms(data));
  });
};

export const fetchFilmByTitle = (payload) => (dispatch) => {
  return filmApi.get(`/find?title=${payload}`).then(({ data }) => {
    dispatch(setActiveFilm(data.search[0]));
  });
};

const setFilms = ({ search, totalResults }) => ({
  type: 'SET_FILMS',
  payload: {
    items: [...search],
    totalItems: totalResults,
  },
});

export const setActiveFilm = (payload) => (dispatch) => {
  dispatch({
    type: 'SET_ACTIVE_FILM',
    payload,
  });

  return Promise.resolve();
};

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});
