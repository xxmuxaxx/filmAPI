import React from 'react';

import classes from './FilmDetail.module.scss';

const FilmDetailFieldItem = ({ name, value }) => (
  <div className={classes.item}>
    <p className={classes.name}>{name}</p>
    <p className={classes.value}>{value}</p>
  </div>
);

export default FilmDetailFieldItem;
