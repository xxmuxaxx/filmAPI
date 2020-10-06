import { combineReducers } from "redux";

import films from "./films";
import pagination from "./pagination";

const rootReducer = combineReducers({
  films,
  pagination,
});

export default rootReducer;
