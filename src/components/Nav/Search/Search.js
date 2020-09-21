import React from "react";
import classes from "./Search.module.css";
import Input from "../../UI/Input/Input";

const Search = (props) => {

  function renderFilmList() {
    return props.dropdown.map((filmLink) => {
      return (
        <li key={filmLink.id}>
          <a
            href={"/film/" + filmLink.title}
            className={classes.Link}
            onClick={props.linkClickHandler}
          >
            {filmLink.title}
          </a>
        </li>
      )
    })
  }

  return (
    <div className={classes.Search}>
      <form>
        <Input {...props} />
        <ul className={classes.Dropdown}>
          { renderFilmList() }
        </ul>
        <button></button>
      </form>
    </div>
  );
};

export default Search;
