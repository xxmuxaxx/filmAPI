const initialState = {
  page: 1,
  pageSize: 16,
};

const pagination = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
};

export default pagination;
