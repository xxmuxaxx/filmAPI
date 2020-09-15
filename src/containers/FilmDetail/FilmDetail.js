import React, { Component } from "react";
import classes from "./FilmDetail.module.css";
import FilmCard from "../../components/FilmCard/FilmCard";

class FilmDetail extends Component {
  state = {
    film: [],
  };

  async componentDidMount() {
    fetch("https://salty-lowlands-03006.herokuapp.com/movies")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            film: result.search[this.props.match.params.id - 1],
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  renderFilms() {
    return this.state.films.map((film) => {
      return (
        <FilmCard
          key={film.id}
          poster={film.poster}
          filmName={film.title}
          filmYear={film.year}
        />
      );
    });
  }

  render() {
    let linkToImdb = `https://www.imdb.com/title/${this.state.film.imdbID}`;

    return (
      <div className={classes.FilmDetail}>
        <div className={classes.FilmDetailInner}>
          <img
            src={this.state.film.poster}
            width="362px"
            height="auto"
            style={{ float: "left", margin: "0 30px 35px 0" }}
            alt={this.state.film.title}
          />
          <h2>{this.state.film.title}</h2>
          <p>{this.state.film.titleEn}</p>
          <div className={classes.FilmDetailField}>
            <p>Год: {this.state.film.year}</p>
            <p>Страна: {this.state.film.country}</p>
            <p>
              imdbID: <a href={linkToImdb}>{this.state.film.imdbID}</a>
            </p>
          </div>
          <a href="/">на главную</a>
          <div style={{ clear: "both" }}></div>
          <div className={classes.FilmDetailDescription}>
            <p>Описание:</p>
            <br />
            <p>{this.state.film.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FilmDetail;
