import React, { Component } from "react";
import classes from "./FilmLib.module.css";
import FilmCard from "../../components/FilmCard/FilmCard";

class FilmLib extends Component {
  state = {
    films: [],
  };

  async componentDidMount() {
    fetch("https://salty-lowlands-03006.herokuapp.com/movies/")
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            films: result.search,
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
          id={film.id}
          poster={film.poster}
          filmName={film.title}
          filmYear={film.year}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.FilmLib}>
        <div className="container">
          <div className={classes.FilmLibWrapper}>{this.renderFilms()}</div>
        </div>
      </div>
    );
  }
}

export default FilmLib;
