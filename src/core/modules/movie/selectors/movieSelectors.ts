import { RootState } from 'core/coreReducers';

export const selectMovieState = (state: RootState) => state.movie;
export const selectMovies = (state: RootState) => state.movie.items;
export const selectTotalMovies = (state: RootState) => state.movie.totalItems;
export const selectSearchText = (state: RootState) => state.movie.searchText;
export const selectSearchItems = (state: RootState) => state.movie.searchItems;
