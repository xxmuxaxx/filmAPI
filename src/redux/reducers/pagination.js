const initialState = {
  page: 1,
  pageSize: 12,
};

const pagination = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };

    case 'SET_PAGE_SIZE':
      return {
        ...state,
        pageSize: action.payload,
      };

    default:
      return state;
  }
};

export default pagination;
