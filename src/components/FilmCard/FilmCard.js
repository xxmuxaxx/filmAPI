import React, { Component } from 'react'
import classes from './FilmCard.module.css'
import {NavLink} from 'react-router-dom'
import Button from '../UI/Button/Button'

const FilmCard = props => {
  console.log(props);

  return (
    <div 
      className={classes.FilmCard}
    >
      <img src={props.poster}/>
      <div
        className={classes.FilmCardHover}
        onMouseEnter={props.onMouseEnter}
      >
        <div className={classes.FilmInfo}>
          <Button
            onClick={props.onClick}
          >
            <NavLink to={'/film/' + props.id}>
              Открыть карточку фильма {props.id}
            </NavLink>
          </Button>
          <h3>{props.filmName}</h3>
          <p>{props.filmYear}</p>
        </div>
      </div>


    </div>
  )
}

export default FilmCard