import { deleteCookie, setCookie } from 'core/helpers/cookieHelper';
import { getErrorMessage } from 'core/http';
import loginApi from 'core/modules/users/api/loginApi';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import usersApi from '../api/usersApi';
import { UsersAction, UsersActionTypes } from '../reducers/userReducer';
import { AuthenticationRequest, CurrentUser } from '../types/usersTypes';

export const fetchAuth =
  (body: AuthenticationRequest) =>
  async (dispatch: ThunkDispatch<unknown, unknown, UsersAction>) => {
    dispatch({ type: UsersActionTypes.SET_IS_FETCHING, payload: true });
    dispatch({ type: UsersActionTypes.SET_ERROR, payload: '' });

    try {
      const { status, data } = await loginApi.login(body);
      if (status === 200) {
        setCookie('token', data.token);
        dispatch(fetchCurrentUser());
      }
    } catch (error) {
      dispatch({ type: UsersActionTypes.SET_ERROR, payload: getErrorMessage(error) });
    } finally {
      dispatch({ type: UsersActionTypes.SET_IS_FETCHING, payload: false });
    }
  };

export const fetchCurrentUser =
  () => async (dispatch: Dispatch<UsersAction>) => {
    try {
      const { data, status } = await usersApi.getCurrentUser();
      const rolePermissions: string[] = [];

      if (status === 200) {
        data.roles.forEach((role) =>
          role.rolePermissions.map((perm) =>
            rolePermissions.push(perm.authority)
          )
        );

        dispatch({
          type: UsersActionTypes.SET_CURRENT_USER,
          payload: {
            ...data,
            rolePermissions: [...new Set(rolePermissions)],
            roles: data.roles.map((role) => role.name),
          },
        });
      }
    } catch (e) {
      console.warn(e);
      deleteCookie('token');
      dispatch({ type: UsersActionTypes.SET_CURRENT_USER, payload: null });
    }
  };

export const logout = () => async (dispatch: Dispatch<UsersAction>) => {
  deleteCookie('token');
  dispatch({ type: UsersActionTypes.SET_CURRENT_USER, payload: null });
};

export const updateCurrentUser = (payload: Partial<CurrentUser>) => ({
  type: UsersActionTypes.UPDATE_CURRENT_USER,
  payload,
});
