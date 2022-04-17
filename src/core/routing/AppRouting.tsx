import { env } from 'core/helpers/environment';
import React, { lazy, VFC } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from '../modules/app/components/layout/Layout';

const MoviePage = lazy(() => import('modules/movie/MoviePage'));
const MoviesPage = lazy(() => import('modules/movies/MoviesPage'));
const LoginPage = lazy(() => import('modules/login/LoginPage'));
const RegistrationPage = lazy(
  () => import('modules/registration/RegistrationPage')
);
const ProfilePage = lazy(() => import('modules/profile/ProfilePage'));

const AppRouting: VFC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path={env.film.baseUrl} component={MoviePage} />
          <Route path={env.films.baseUrl} component={MoviesPage} />
          <Route path={env.login.baseUrl} component={LoginPage} />
          <Route path={env.registration.baseUrl} component={RegistrationPage} />
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

export default AppRouting;
