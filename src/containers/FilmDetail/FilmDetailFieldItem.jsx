import React from 'react';

import classes from './FilmDetail.module.scss';

const FilmDetailFieldItem = ({ name, value }) => (
  <div className={classes.FilmDetailFieldItem}>
    <p className={classes.FilmDetailFieldItemName}>{name}</p>
    <p className={classes.FilmDetailFieldItemValue}>{value}</p>
  </div>
);

export default FilmDetailFieldItem;
