import * as movieActions from 'core/modules/movie/actions/movieActions';
import * as usersActions from 'core/modules/users/actions/usersActions';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const actions = {
  ...movieActions,
  ...usersActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
