import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import FilmLib from "./containers/FilmLib/FilmLib";
import FilmDetail from "./containers/FilmDetail/FilmDetail";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/film/:title" component={FilmDetail} />
        <Route path="/" component={FilmLib} />
      </Switch>
    </Layout>
  );
}
