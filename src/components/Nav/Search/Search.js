import React, { useRef } from "react";
import { Link } from "react-router-dom";

import Input from "../../UI/Input/Input";
import classes from "./Search.module.css";

const Search = (props) => {
  const ref = useRef();

  function renderFilmList() {
    return props.dropdown.map((filmLink) => {
      return (
        <li key={filmLink.id} data-title={filmLink.title}>
          <Link
            to={`/film/${filmLink.title}`}
            className={classes.Link}
            onClick={props.linkClickHandler}
          >
            {filmLink.title}
          </Link>
        </li>
      );
    });
  }

  return (
    <div className={classes.Search}>
      <form onSubmit={props.formSubmitHandler}>
        <Input {...props} />
        <ul className={classes.Dropdown} ref={ref}>
          {renderFilmList()}
        </ul>
        <button></button>
      </form>
    </div>
  );
};

export default Search;
