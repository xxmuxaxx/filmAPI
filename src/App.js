import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import IndexPage from "./routes/IndexPage/IndexPage";
import FilmsContainer from './containers/FilmsContainer/FilmsContainer';
import FilmDetail from './containers/FilmDetail/FilmDetail';
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import AuthPage from "./routes/AuthPage/AuthPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/films/:title" component={FilmDetail} />
        <Route path="/films/" component={FilmsContainer} />
        <Route path="/profile/auth" component={AuthPage} />
        <Route path="/profile/" component={ProfilePage} />
        <Route path="/" component={IndexPage} />
      </Switch>
    </Layout>
  );
}

export default App;
