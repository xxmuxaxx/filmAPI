import usersApi from '../../api/usersApi';
import authApi from '../../api/authApi';
import { deleteCookie, setCookie } from '../../services/cookieHelper';

export const usersActions = {
  setCurrentUser: (payload) => ({ type: 'users/setCurrentUser', payload }),
  updateCurrentUser: (payload) => ({
    type: 'users/updateCurrentUser',
    payload,
  }),
  setIsFetching: (payload) => ({ type: 'users/setIsFetching', payload }),
  setError: (payload) => ({ type: 'users/setError', payload }),
};

export const fetchAuth = (payload) => async (dispatch) => {
  dispatch(usersActions.setIsFetching(true));
  dispatch(usersActions.setError(''));
  try {
    const { status, data } = await authApi.login(payload);
    if (status === 200) {
      dispatch(fetchCurrentUser(`Bearer ${data.token}`));
    }
  } catch (error) {
    dispatch(usersActions.setError(String(error)));
  }
  dispatch(usersActions.setIsFetching(false));
};

export const fetchCurrentUser = (payload) => async (dispatch) => {
  try {
    const { data, status } = await usersApi.getCurrentUser(payload);
    const rolePermissions = [];

    if (status === 200) {
      data.roles.forEach((role) =>
        role.rolePermissions.map((perm) => rolePermissions.push(perm.authority))
      );

      dispatch(
        usersActions.setCurrentUser({
          ...data,
          rolePermissions: [...new Set(rolePermissions)],
          roles: data.roles.map((role) => role.name),
        })
      );
      setCookie('Authorization', `Bearer ${payload}`);
    }
  } catch (e) {
    console.warn(e);
    deleteCookie('Authorization');
    dispatch(usersActions.setCurrentUser(null));
  }
};

export const fetchUpdateUser = (payload) => (dispatch) => {
  usersApi
    .updateUser(payload)
    .then((data) => dispatch(usersActions.updateCurrentUser(data)));
};
