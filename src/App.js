import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import FilmLib from './containers/FilmLib/FilmLib';
import FilmDetail from './containers/FilmDetail/FilmDetail';
import ProfileContainer from './containers/ProfileContainer/ProfileContainer';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/actions/users';

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1,
  });
}

function App() {
  const dispatch = useDispatch();

  if (getCookie('login')) {
    const login = getCookie('login');
    const password = getCookie('password');

    dispatch(fetchUser({ login, password }));
  }

  return (
    <Layout>
      <Switch>
        <Route path="/film/:title" component={FilmDetail} />
        <Route path="/profile/" component={ProfileContainer} />
        <Route path="/" component={FilmLib} />
      </Switch>
    </Layout>
  );
}

export default App;
