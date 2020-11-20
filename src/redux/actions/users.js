import begetApi from '../../api/begetApi';
import { setCookie } from '../../utils/functions';

export const fetchUser = (payload) => (dispatch) => {
  begetApi.getUser(payload.login, payload.password).then((data) => {
    if (data.status === 1) {
      setCookie('login', payload.login);
      setCookie('password', payload.password);

      dispatch(setUser(data));
    } else alert(data.message)
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
