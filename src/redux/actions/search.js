import filmApi from '../../api/filmApi';

export const fetchSearchFilmsByTitle = (payload) => (dispatch) => {
  return filmApi.searchFilmsPageable(payload, 10).then((data) => {
    dispatch(setSearchItems(data));
  });
};

export const setSearchText = (payload) => ({
  type: 'SET_SEARCH_TEXT',
  payload,
});

export const setSearchItems = (payload) => ({
  type: 'SET_SEARCH_ITEMS',
  payload,
});
