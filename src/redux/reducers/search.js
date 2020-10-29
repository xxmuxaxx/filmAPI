const initialState = {
  searchText: "",
  searchItems: [],
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.payload,
      };

    case "SET_SEARCH_ITEMS":
      return {
        ...state,
        searchItems: action.payload,
      };

    default:
      return state;
  }
};

export default search;
