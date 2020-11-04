import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import FilmLib from './containers/FilmLib/FilmLib';
import FilmDetail from './containers/FilmDetail/FilmDetail';
import ProfileContainer from './containers/ProfileContainer/ProfileContainer';

function App() {
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
