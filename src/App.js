import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import FilmLib from "./containers/FilmLib/FilmLib";
import FilmDetail from "./containers/FilmDetail/FilmDetail";
import Header from "./components/Header/Header";

class App extends Component {
  state = {
    responseFilms: [],
  };

  inputChangeHandler = async (e) => {
    const target = e.target.value.trim() || null;
    const request = `https://salty-lowlands-03006.herokuapp.com/movies/find?title=${target}`;

    fetch(request)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ responseFilms: result.search });
      });
  };

  render() {
    return (
      <Layout>
        <Header
          inputChangeHandler={this.inputChangeHandler}
          placeholder={"Поиск фильма"}
          dropdown={this.state.responseFilms}
        />
        <Switch>
          <Route path="/film/:id" component={FilmDetail} />
          <Route path="/" component={FilmLib} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
