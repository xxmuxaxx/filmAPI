import React, { Component } from "react";

import Header from "../../components/Header/Header";
import axios from "../../axios/axiosFilmApi";
import classes from "./Layout.module.css";

export default function Layout(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  async function searchRequest() {
    await axios.get(`find?title=${search}`).then(({ data }) => {
      setSearchResults({ searchResults: data.search });
    });
  }

  const inputChangeHandler = (event) => {
    setSearch({ search: event.target.value }, () => searchRequest());
  };

  const linkClickHandler = () => {
    setSearch({ search: "" }, () => this.requestFromApi());
  };

  return (
    <div className={classes.Layout}>
      <Header
        linkClickHandler={linkClickHandler}
        inputChangeHandler={inputChangeHandler}
        placeholder={"Введите название фильма"}
        dropdown={searchResults}
        value={search}
      />
      <main>{props.children}</main>
    </div>
  );
}
