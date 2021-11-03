const initialState = {
  currentUser: null,
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
    case 'users/setCurrentUserAvatar':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: action.payload,
        },
      };
    default:
      return state;
  }
};

export default users;
