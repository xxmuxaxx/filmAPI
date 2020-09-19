import React from "react";
import classes from "./Search.module.css";
import Input from "../../UI/Input/Input";
import { NavLink } from "react-router-dom";

const Search = (props) => {
  return (
    <div className={classes.Search}>
      <form>
        <Input {...props} />
        <ul className={classes.Dropdown}>
          {props.dropdown.map((film) => {
            return (
              <li key={film.id}>
                <NavLink to={"/film/" + film.id} className={classes.Link}>
                  {film.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <button></button>
      </form>
    </div>
  );
};

export default Search;
