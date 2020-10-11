import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

import Header from "../../components/Header/Header";
import classes from "./Layout.module.css";

const Layout = React.memo(function Layout(props) {
  const [responseFilms, setResponseFilms] = React.useState([]);
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    (searchInputValue && requestFromApi()) || setResponseFilms([]);

    function requestFromApi() {
      console.log("API GET SEARCH");
      const value = searchInputValue.trim() || null;
      const request = `https://film-api-backend.herokuapp.com/movies/find?title=${value}`;

      fetch(request)
        .then((response) => response.json())
        .then((result) => {
          setResponseFilms(result.search);
        });
    }
  }, [searchInputValue]);

  const inputChangeHandler = async (event) => {
    setSearchInputValue(event.target.value);
  };

  const linkClickHandler = async () => {
    setSearchInputValue("");
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (responseFilms.length) {
      const title = responseFilms[0].title;
      setSearchInputValue("");
      history.push(`/film/${title}`);
    }
  };

  return (
    <div className={classes.Layout}>
      <Header
        linkClickHandler={linkClickHandler}
        inputChangeHandler={inputChangeHandler}
        formSubmitHandler={formSubmitHandler}
        placeholder={"Введите название фильма"}
        dropdown={responseFilms}
        value={searchInputValue}
      />
      <main>{props.children}</main>
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
});

export default Layout;
