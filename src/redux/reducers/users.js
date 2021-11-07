const initialState = {
  currentUser: null,
  isFetching: false,
  error: '',
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'users/setCurrentUser':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'users/updateCurrentUser':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    case 'users/setIsFetching':
      return {
        ...state,
        isFetching: action.payload,
      };
    case 'users/setError':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default users;
