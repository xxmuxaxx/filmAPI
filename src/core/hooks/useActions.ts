import { useAppDispatch } from "core/configureStore";
import * as movieActions from "core/modules/movie/actions/movieActions";
import * as usersActions from "core/modules/users/actions/usersActions";
import { useMemo } from "react";
import { bindActionCreators } from "redux";

const actions = {
  ...movieActions,
  ...usersActions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
