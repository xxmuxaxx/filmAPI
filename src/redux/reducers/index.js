import { combineReducers } from 'redux';

import films from './films';
import pagination from './pagination';
import search from './search';
import users from './users';

const rootReducer = combineReducers({
  films: films,
  pagination: pagination,
  search: search,
  users: users,
});

export default rootReducer;
