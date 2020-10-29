import { combineReducers } from "redux";

import films from "./films";
import pagination from "./pagination";
import search from "./search";

const rootReducer = combineReducers({
  films,
  pagination,
  search,
});

export default rootReducer;
