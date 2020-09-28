import React, { useRef } from "react";
import classes from "./Search.module.css";
import Input from "../../UI/Input/Input";
import { Link } from "react-router-dom";

const Search = (props) => {
  const ref = useRef();
  // const history = useHistory();

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

  const openFirstFilm = (e) => {
    e.preventDefault();

    if (ref.current.children.length) {
      const title = ref.current.children[0].dataset.title;

      // history.push(`/film/${title}`);

      window.location.replace(`/film/${title}`);
    }
  };

  return (
    <div className={classes.Search}>
      <form onSubmit={(e) => openFirstFilm(e)}>
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
