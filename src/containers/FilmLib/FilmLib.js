import React, { Component } from "react";
import classes from "./FilmLib.module.css";
import FilmCard from "../../components/FilmCard/FilmCard";
import Loader from "../../components/Loader/Loader";

class FilmLib extends Component {
  state = {
    films: [],
    load: false,
  };

  async componentDidMount() {
    await fetch(`https://salty-lowlands-03006.herokuapp.com/movies`)
    .then((response) => response.json())
    .then(
      (result) => {
        this.setState({
          films: result.search,
          load: true
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
        {
        this.state.load ?
        <div className="container">
          <div className={classes.FilmLibWrapper}>
            {this.renderFilms()}
          </div>
        </div> : <Loader />
        }
      </div>
    );
  }
}

export default FilmLib;
