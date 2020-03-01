import React, { Component } from 'react'
import classes from './FilmCard.module.css'
import FilmCardHover from './FilmCardHover/FilmCardHover';

class FilmCard extends Component {
  state = {

    films: [
      {
        id: 1,
        poster: 'https://www.kinopoisk.ru/images/film_big/448.jpg',
        name: 'Форест Гамп',
        year: 1994
      }
    ]

  }

  render() {
    return (
      <div 
        className={classes.FilmCard}
      >
        <img src={this.state.films[0].poster} alt="aaaa"/>
        <FilmCardHover />
      </div>
    )
  }
}

export default FilmCard