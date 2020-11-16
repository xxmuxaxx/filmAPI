import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import FilmsContainer from './containers/FilmsContainer/FilmsContainer';
import FilmDetail from './containers/FilmDetail/FilmDetail';
import ProfileContainer from './containers/ProfileContainer/ProfileContainer';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/film/:title" component={FilmDetail} />
        <Route path="/profile/" component={ProfileContainer} />
        <Route path="/" component={FilmsContainer} />
      </Switch>
    </Layout>
  );
}

export default App;
