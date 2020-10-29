import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import classes from "./Layout.module.css";
import { fetchFilms } from "../../redux/actions/films";

const Layout = React.memo(function Layout(props) {
  const dispatch = useDispatch();

  const { page, pageSize } = useSelector(({ pagination }) => pagination);

  React.useEffect(() => {
    dispatch(fetchFilms(page, pageSize));
  }, [dispatch, page, pageSize]);

  return (
    <div className={classes.Layout}>
      <Header />
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
