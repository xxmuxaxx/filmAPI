import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import FilmDetail from './containers/FilmDetail/FilmDetail';
import FilmsPage from './routes/FilmsPage/FilmsPage';
import ProfilePage from './routes/ProfilePage/ProfilePage';
import AuthPage from './routes/AuthPage/AuthPage';

import './App.scss';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/films/:title" component={FilmDetail} />
        <Route path="/films/" component={FilmsPage} />
        <Route path="/profile/auth" component={AuthPage} />
        <Route path="/profile/" component={ProfilePage} />
        <Route path="/" render={() => <Redirect to={'/films/'} />} />
      </Switch>
    </Layout>
  );
};

export default App;
