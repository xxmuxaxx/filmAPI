import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import FilmLib from './containers/FilmLib/FilmLib'


class App extends Component {
  render() {
    return (
      <Layout>
        <FilmLib />
      </Layout>
    )
  }
}

export default App;
