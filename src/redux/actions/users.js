import begetApi from '../../api/begetApi';
import { setCookie } from '../../core/functions';

export const fetchUser = (payload) => (dispatch) => {
  begetApi.getUser(payload.login, payload.password).then((data) => {
    setCookie('login', payload.login);
    setCookie('password', payload.password);

    dispatch(setUser(data));
  });
};

export const fetchUpdateUserAvatar = (payload) => (dispatch) => {
  begetApi.setUserAvatar(payload).then((data) => dispatch(setUserAvatar(data)));
};

export const setUser = (payload) => {
  return {
    type: 'SET_USER',
    payload,
  };
};

export const setUserAvatar = (payload) => ({
  type: 'SET_USER_AVATAR',
  payload,
});
