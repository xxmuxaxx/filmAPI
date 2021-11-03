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
  auth: {
    baseUrl: '/profile/auth',
    title: 'Авторизация',
  },
};

export { env };
