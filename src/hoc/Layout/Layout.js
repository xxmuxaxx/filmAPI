import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Header from "../../components/Header/Header";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    responseFilms: [],
    searchInputValue: "",
  };

  requestFromApi() {
    const value = this.state.searchInputValue.trim() || null;
    const request = `https://film-api-backend.herokuapp.com/movies/find?title=${value}`;

    fetch(request)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ responseFilms: result.search });
      });
  }

  inputChangeHandler = async (event) => {
    this.setState({ searchInputValue: event.target.value }, () =>
      this.requestFromApi()
    );
  };

  linkClickHandler = async () => {
    this.setState({ searchInputValue: "" }, () => this.requestFromApi());
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Header
          linkClickHandler={this.linkClickHandler}
          inputChangeHandler={this.inputChangeHandler}
          placeholder={"Введите название фильма"}
          dropdown={this.state.responseFilms}
          value={this.state.searchInputValue}
        />
        <main>{this.props.children}</main>
        <footer className="footer">
          <div className="container">
            <div className="footer__wrapper">
              <NavLink to="/" className="logo">
                <div className="logo__text-wrapper">
                  <p className="logo__big-text">Кавказский</p>
                  <p className="logo__text">кинопоиск</p>
                </div>
              </NavLink>
              <div className="copyright">
                <p className="copyright__top">Разработанно в студии</p>
                <p className="copyright__bottom">Не твоих собачих дел</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Layout;
