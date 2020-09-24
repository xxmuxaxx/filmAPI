import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../Nav/Search/Search";

export default function Header(props) {
  return (
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
          <div className="hamburger">
            <div className="hamburger__item"></div>
            <div className="hamburger__item"></div>
            <div className="hamburger__item"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
