import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../Nav/Search/Search";
import classes from "./Header.module.css";

export default function Header(props) {
  return (
    <header className={classes.Header}>
      <div className="container">
        <div className={classes.HeaderWrapper}>
          <NavLink to="/" className={classes.Link}>
            Кавказский кинопоиск
          </NavLink>
          <Search
            inputChangeHandler={props.inputChangeHandler}
            placeholder={props.placeholder}
            dropdown={props.dropdown}
          />
          <div className={classes.Hamburger}>
            <div className={classes.HamburgerItem}></div>
            <div className={classes.HamburgerItem}></div>
            <div className={classes.HamburgerItem}></div>
          </div>
        </div>
      </div>
    </header>
  );
}
