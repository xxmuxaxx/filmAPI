import React from 'react'
import classes from './FilmCardHover.module.css'

const FilmCardHover = props => {

  return (
    <div className={classes.FilmCardHover}>
      <button>Открыть карточку фильма</button>
      <div className={classes.FilmInfo}>
        <h3> Форест Гамп </h3>
        <p> 1994 год </p>
      </div>
    </div>
  )
}

export default FilmCardHover