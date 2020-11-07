import usersApi from '../../axios/begetApi';

export const fetchUser = (payload) => (dispatch) => {
  usersApi
    .get(`users/?u=${payload.login}&p=${payload.password}`)
    .then(({ data }) => {
      document.cookie = `login=${payload.login}`;
      document.cookie = `password=${payload.password}`;
      dispatch(setUser(data));
    })
    .catch(() => alert('Неверный логин или пароль'));
};

export const fetchUpdateUserAvatar = (payload) => (dispatch) => {
  usersApi.post('users/', payload).then(({ data }) => dispatch(setUserAvatar(data.url)));
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
