import React from 'react'
import classes from './FilmCard.module.css'
import {NavLink} from 'react-router-dom'
import Button from '../UI/Button/Button'

const FilmCard = props => {
  return (
    <div className={classes.FilmCard}>
      <img src={props.poster} alt="1"/>
      <div
        className={classes.FilmCardHover}
        onMouseEnter={props.onMouseEnter}
      >
        <div className={classes.FilmInfo}>
          <NavLink to={'/film/' + props.id}>
            <Button onClick={props.onClick}>            
              Открыть карточку фильма
            </Button>
          </NavLink>
          <h3>{props.filmName}</h3>
          <p>{props.filmYear}</p>
        </div>
      </div>
    </div>
  )
}

export default FilmCard