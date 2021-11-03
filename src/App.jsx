import React, { useEffect } from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { env } from './services/environment';
import { getCookie } from './services/cookieHelper';
import { fetchCurrentUser } from './redux/actions/users';
import Layout from './containers/Layout/Layout';
import FilmDetail from './containers/FilmDetail/FilmDetail';
import { AuthPage, ProfilePage, FilmsPage } from './pages';
import 'antd/dist/antd.css';
import 'fontsource-roboto';
import './index.css';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  // Проверяем наличие токена в куках. И, если есть - получаем пользователя
  useEffect(() => {
    const token = getCookie('Authorization');
    if (token) dispatch(fetchCurrentUser(token));
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path={env.film.baseUrl} component={FilmDetail} />
          <Route path={env.films.baseUrl} component={FilmsPage} />
          <Route path={env.auth.baseUrl} component={AuthPage} />
          <Route path={env.profile.baseUrl} component={ProfilePage} />
          <Route
            path={env.index.baseUrl}
            render={() => <Redirect to={env.films.baseUrl} />}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
