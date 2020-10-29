import filmApi from "../../axios/axiosFilmApi";

export const fetchSearchFilmsByTitle = (payload) => (dispatch) => {
  return filmApi.get(`/find?title=${payload}`).then(({ data }) => {
    dispatch(setSearchItems(data.search));
  });
};

export const setSearchText = (payload) => ({
  type: "SET_SEARCH_TEXT",
  payload,
});

export const setSearchItems = (payload) => ({
  type: "SET_SEARCH_ITEMS",
  payload,
});
