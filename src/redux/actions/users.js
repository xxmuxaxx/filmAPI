import begetApi from '../../api/begetApi';
import usersApi from '../../api/usersApi';
import authApi from '../../api/authApi';
import { deleteCookie, setCookie } from '../../services/cookieHelper';

export const usersActions = {
  setCurrentUser: (payload) => ({
    type: 'users/setCurrentUser',
    payload,
  }),
  updateCurrentUser: (payload) => ({
    type: 'users/updateCurrentUser',
    payload,
  }),
  setCurrentUserAvatar: (payload) => ({
    type: 'users/setCurrentUserAvatar',
    payload,
  }),
};

export const fetchAuth = (payload) => async (dispatch) => {
  const { status, data } = await authApi.login(payload);

  if (status === 200) {
    dispatch(fetchCurrentUser(`Bearer ${data.token}`));
    setCookie('Authorization', `Bearer ${data.token}`);
  }
};

export const fetchCurrentUser = (payload) => async (dispatch) => {
  try {
    const response = await usersApi.getCurrentUser(payload);
    const rolePermissions = [];

    response.data.roles.forEach((role) =>
      role.rolePermissions.map((perm) => rolePermissions.push(perm.authority))
    );

    if (response.status === 200) {
      const data = {
        ...response.data,
        rolePermissions: [...new Set(rolePermissions)],
        roles: response.data.roles.map((role) => role.name),
      };

      dispatch(usersActions.setCurrentUser(data));
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

export const fetchUpdateUserAvatar = (payload) => (dispatch) => {
  begetApi
    .setUserAvatar(payload)
    .then((data) => dispatch(usersActions.setCurrentUserAvatar(data)));
};
