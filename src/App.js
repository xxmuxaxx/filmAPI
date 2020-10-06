import React from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import FilmLib from "./containers/FilmLib/FilmLib";
import FilmDetail from "./containers/FilmDetail/FilmDetail";
import { fetchFilms } from "./redux/actions/films";

function App() {
  const dispatch = useDispatch();
  const { page, pageSize } = useSelector(({ pagination }) => pagination);

  React.useEffect(() => {
    dispatch(fetchFilms(page, pageSize));
  }, [dispatch, page, pageSize]);

  return (
    <Layout>
      <Switch>
        <Route path="/film/:title" component={FilmDetail} />
        <Route path="/" component={FilmLib} />
      </Switch>
    </Layout>
  );
}

export default App;
