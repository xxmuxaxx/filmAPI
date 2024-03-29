const env = {
  index: {
    baseUrl: '/',
    title: 'Главная',
  },
  films: {
    baseUrl: '/films',
    title: 'Фильмы',
  },
  film: {
    baseUrl: '/films/:title',
  },
  profile: {
    baseUrl: '/profile',
    title: 'Профиль',
  },
  login: {
    baseUrl: '/login',
    title: 'Авторизация',
  },
  registration: {
    baseUrl: '/registration',
    title: 'Регистрация',
  },
};

export { env };
