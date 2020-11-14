import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import FilmLib from './containers/FilmLib/FilmLib';
import FilmDetail from './containers/FilmDetail/FilmDetail';
import ProfileContainer from './containers/ProfileContainer/ProfileContainer';
import { fetchUser } from './redux/actions/users';
import { getCookie } from './Core/functions';

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
