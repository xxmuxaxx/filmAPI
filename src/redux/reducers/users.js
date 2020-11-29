const initialState = {
  user: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        },
      };

    case 'SET_USER_AVATAR':
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };

    default:
      return state;
  }
};

export default users;
