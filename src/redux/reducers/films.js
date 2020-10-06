const initialState = {
  items: [],
  isLoaded: false,
  totalItems: 0,
};

const films = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILMS":
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        isLoaded: true,
      };

    case "SET_LOADED":
      return {
        ...state,
        isLoaded: action.payload,
      };

    default:
      return state;
  }
};

export default films;
