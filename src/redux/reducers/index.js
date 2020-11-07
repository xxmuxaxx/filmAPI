import { combineReducers } from 'redux';

import films from './films';
import pagination from './pagination';
import search from './search';
import users from './users';

const rootReducer = combineReducers({
  films,
  pagination,
  search,
  users,
});

export default rootReducer;
