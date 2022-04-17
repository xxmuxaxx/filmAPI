import { combineReducers } from 'redux';

import movieReducer from './modules/movie/reducers/movieReducer';
import userReducer from './modules/users/reducers/userReducer';

const rootReducer = combineReducers({
  movie: movieReducer,
  users: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
