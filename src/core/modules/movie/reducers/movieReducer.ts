import { Movie } from "../types/movieTypes";

export enum MovieActionTypes {
  SET_MOVIES = "SET_MOVIES",
  SET_ACTIVE_MOVIE = "SET_ACTIVE_MOVIE",
  SET_LOADED = "SET_LOADED",
  SET_SEARCH_TEXT = "SET_SEARCH_TEXT",
  SET_SEARCH_ITEMS = "SET_SEARCH_ITEMS",
  SET_PAGE = "SET_PAGE",
  SET_PAGE_SIZE = "SET_PAGE_SIZE",
}

const initialState: MovieState = {
  items: [],
  activeItem: null,
  isLoaded: false,
  totalItems: 0,
  searchText: "",
  searchItems: [],
  page: 1,
  pageSize: 12,
};

const movieReducer = (
  state = initialState,
  action: MovieAction
): MovieState => {
  switch (action.type) {
    case MovieActionTypes.SET_MOVIES:
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        isLoaded: true,
      };

    case MovieActionTypes.SET_ACTIVE_MOVIE:
      return {
        ...state,
        activeItem: action.payload,
      };

    case MovieActionTypes.SET_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };

    case MovieActionTypes.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };

    case MovieActionTypes.SET_SEARCH_ITEMS:
      return {
        ...state,
        searchItems: action.payload,
      };

    case MovieActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case MovieActionTypes.SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
      };

    default:
      return state;
  }
};

export interface MovieState {
  items: Movie[];
  activeItem: Movie | null;
  isLoaded: boolean;
  totalItems: number;
  searchText: string;
  searchItems: Movie[];
  page: number;
  pageSize: number;
}

interface SetMoviesAction {
  type: typeof MovieActionTypes.SET_MOVIES;
  payload: {
    items: Movie[];
    totalItems: number;
  };
}

interface SetActiveMovieAction {
  type: typeof MovieActionTypes.SET_ACTIVE_MOVIE;
  payload: Movie;
}

interface SetLoadedAction {
  type: typeof MovieActionTypes.SET_LOADED;
  payload: boolean;
}

interface SetSearchTextAction {
  type: typeof MovieActionTypes.SET_SEARCH_TEXT;
  payload: string;
}

interface SetSearchItemsAction {
  type: typeof MovieActionTypes.SET_SEARCH_ITEMS;
  payload: Movie[];
}

interface SetPageAction {
  type: typeof MovieActionTypes.SET_PAGE;
  payload: number;
}

interface SetPageSizeAction {
  type: typeof MovieActionTypes.SET_PAGE_SIZE;
  payload: number;
}

export type MovieAction =
  | SetMoviesAction
  | SetActiveMovieAction
  | SetLoadedAction
  | SetSearchTextAction
  | SetSearchItemsAction
  | SetPageAction
  | SetPageSizeAction;

export default movieReducer;
