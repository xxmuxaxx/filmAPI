import filmApi from '../../api/filmApi';
import IMDBAlternative from '../../api/IMDBAlternative';

export const fetchAllFilms = () => (dispatch) => {
  dispatch({ type: 'SET_LOADED', payload: false });

  filmApi.getAllFilms().then((data) => dispatch(setFilms(data)));
};

export const fetchFilms =
  (page = 1, size = 16) =>
  (dispatch) => {
    dispatch({ type: 'SET_LOADED', payload: false });

    filmApi.getFilmsPage(page, size).then((data) => dispatch(setFilms(data)));
  };

export const fetchFilmByTitle = (title) => (dispatch) => {
  filmApi
    .searchFilmsByTitle(title)
    .then((film) => dispatch(fetchFilmIMDBFields(film[0])));
};

export const fetchFilmIMDBFields = (film) => (dispatch) => {
  IMDBAlternative.getFilm(film.imdbID).then((data) =>
    dispatch(setActiveFilm({ ...film, ...data }))
  );
};

const setFilms = (payload) => ({
  type: 'SET_FILMS',
  payload: {
    items: [...payload.search],
    totalItems: payload.totalResults,
  },
});

export const setActiveFilm = (payload) => ({
  type: 'SET_ACTIVE_FILM',
  payload,
});

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});
