import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'
import FilmLib from './containers/FilmLib/FilmLib'
import FilmDetail from './containers/FilmDetail/FilmDetail'


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/film/:id" component={FilmDetail} />
          <Route path="/" component={FilmLib} />          
        </Switch>
      </Layout>
    )
  }
}

export default App;
