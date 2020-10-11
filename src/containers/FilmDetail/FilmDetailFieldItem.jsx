import React from "react";

import classes from "./FilmDetail.module.scss";

function FilmDetailFieldItem({ name, children }) {
  return (
    <div className={classes.FilmDetailFieldItem}>
      <p className={classes.FilmDetailFieldItemName}>{name}</p>
      <p className={classes.FilmDetailFieldItemValue}>{children}</p>
    </div>
  );
}

export default FilmDetailFieldItem;
