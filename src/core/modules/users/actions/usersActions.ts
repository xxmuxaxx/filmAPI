import { deleteCookie, setCookie } from 'core/helpers/cookieHelper';
import loginApi from 'core/modules/users/api/loginApi';
import { Dispatch } from 'redux';

import usersApi from '../api/usersApi';
import { UsersAction, UsersActionTypes } from '../reducers/userReducer';
import { AuthenticationRequest } from '../types/usersTypes';

export const fetchAuth =
  (body: AuthenticationRequest) => async (dispatch: Dispatch<UsersAction>) => {
    dispatch({ type: UsersActionTypes.SET_IS_FETCHING, payload: true });
    dispatch({ type: UsersActionTypes.SET_ERROR, payload: '' });

    try {
      const { status, data } = await loginApi.login(body);
      if (status === 200) {
        setCookie('token', data.token);
        dispatch<any>(fetchCurrentUser());
      }
    } catch (error) {
      dispatch({ type: UsersActionTypes.SET_ERROR, payload: String(error) });
    } finally {
      dispatch({ type: UsersActionTypes.SET_IS_FETCHING, payload: false });
    }
  };

export const fetchCurrentUser =
  () => async (dispatch: Dispatch<UsersAction>) => {
    try {
      const { data, status } = await usersApi.getCurrentUser();
      const rolePermissions: any[] = [];

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

export const updateCurrentUser = (payload: any) => ({
  type: UsersActionTypes.UPDATE_CURRENT_USER,
  payload,
});
