import React, { Component } from 'react'
import classes from './FilmLib.module.css'
import FilmCard from '../../components/FilmCard/FilmCard'

class FilmLib extends Component {
  render() {
    return (
      <div className={classes.FilmLib}>
        <div>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
        </div>
      </div>
    ) 
  }
}

export default FilmLib