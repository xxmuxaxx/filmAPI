import React, { Component } from 'react'
import classes from './FilmDetail.module.css'

class FilmDetail extends Component {  
  state = {
    film: {},
    genres: ''
  }

  async componentDidMount() {
    fetch(`https://salty-lowlands-03006.herokuapp.com/movies/find?title=${this.props.match.params.id}`)
      .then(res => res.json())
      .then(
        (result) => {      
          this.setState({
            film: result.search[0]
          })
          
          console.log()
          
        },
        (error) => {
          this.setState({
            error
          });
        }
      ).then(() => {
        const genres = this.state.film.genres.map(film => film.name).join(', ')        
        this.setState({
          genres
        })
        console.log(this.state)
      })
  }
  
  render() {
    return (
      <div className={classes.FilmDetail}>
        <div className={classes.FilmDetailInner}>
          <img
            src={this.state.film.poster}
            width='362px'
            height='auto'
            style={{float: 'left', margin: '0 30px 35px 0'}}
            alt={this.state.film.titleEn}
          />
          <h2>{this.state.film.title}</h2>
          <p>{this.state.film.titleEn}</p>
          <div className={classes.FilmDetailField}>
            <p>Год: {this.state.film.year}</p>
            <p>Страна: {this.state.film.country}</p>
            <p>Жанры: {this.state.genres || ''}</p>
            <p>imdbID: {this.state.film.imdbID}</p>
          </div>
          <a href="/">на главную</a>
          <div style={{clear: 'both'}}></div>
          <div className={classes.FilmDetailDescription}>
            <p>Описание:</p>
            <br />
            <p>{this.state.film.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default FilmDetail
