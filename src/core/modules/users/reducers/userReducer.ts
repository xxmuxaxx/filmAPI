const initialState: UsersState = {
  currentUser: null,
  isFetching: false,
  error: '',
};

const usersReducer = (state = initialState, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UsersActionTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    case UsersActionTypes.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case UsersActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export interface UsersState {
  currentUser: any;
  isFetching: boolean;
  error: string;
}

export enum UsersActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
  SET_ERROR = 'SET_ERROR',
}

interface SetCurrentUserAction {
  type: typeof UsersActionTypes.SET_CURRENT_USER;
  payload: any;
}

interface UpdateCurrentUserAction {
  type: typeof UsersActionTypes.UPDATE_CURRENT_USER;
  payload: any;
}

interface SetIsFetchingAction {
  type: typeof UsersActionTypes.SET_IS_FETCHING;
  payload: boolean;
}

interface SeErrorAction {
  type: typeof UsersActionTypes.SET_ERROR;
  payload: string;
}

export type UsersAction =
  | SetCurrentUserAction
  | UpdateCurrentUserAction
  | SetIsFetchingAction
  | SeErrorAction;

export default usersReducer;
