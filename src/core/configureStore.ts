import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./coreReducers";

const configureStore = (initialState = {}) => {
  const middlewareEnhancer = applyMiddleware(thunk);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducer, initialState, composedEnhancers);
};

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Parameters<typeof store.dispatch>[0]>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
