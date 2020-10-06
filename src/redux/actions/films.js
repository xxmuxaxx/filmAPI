import filmApi from "../../axios/axiosFilmApi";

export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload,
});

export const fetchFilms = (page = 1, size = 8) => (dispatch) => {
  dispatch({ type: "SET_LOADED", payload: false });

  filmApi
    .get(`/page=${page}/size=${size}`)
    .then(({ data }) => dispatch(setFilms(data)));
};

export const setFilms = ({ search, totalResults }) => ({
  type: "SET_FILMS",
  payload: {
    items: [...search],
    totalItems: totalResults,
  },
});
