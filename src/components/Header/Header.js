import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Search from "../Nav/Search/Search";
import classNames from "classnames";

export default function Header(props) {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  function hamburgerClickHandler() {
    setHamburgerIsOpen(!hamburgerIsOpen);
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <NavLink to="/" className="header__logo">
              Кавказский кинопоиск
            </NavLink>
            <Search
              linkClickHandler={props.linkClickHandler}
              inputChangeHandler={props.inputChangeHandler}
              placeholder={props.placeholder}
              dropdown={props.dropdown}
              value={props.value}
            />
            <div
              onClick={hamburgerClickHandler}
              className={classNames({
                hamburger: true,
                "hamburger--active": hamburgerIsOpen,
              })}
            >
              <div className="hamburger__item"></div>
              <div className="hamburger__item"></div>
              <div className="hamburger__item"></div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={classNames({
          menu: true,
          "menu--active": hamburgerIsOpen,
        })}
      >
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Главная
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Главная
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Главная
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
