import React from "react";
import classes from "./Search.module.css";
import Input from "../../UI/Input/Input";

const Search = (props) => {
  return (
    <div className={classes.Search}>
      <form>
        <Input {...props} />
        <ul className={classes.Dropdown}>
          {props.dropdown.map((film) => {
            return (
              <li key={film.id}>
                <a className={classes.Link} href={`/film/${film.id}`}>
                  {film.title}
                </a>
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
