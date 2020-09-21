import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import classes from "./FilmDetail.module.scss";

class FilmDetail extends Component {
  state = {
    film: [],
    load: false,
  };

  async componentDidMount() {
    const title = this.props.match.params.title;
    fetch(`https://salty-lowlands-03006.herokuapp.com/movies/find?title=${title}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({ film: result.search[0], load: true });
      });
  }

  renderGenres() {
    return this.state.film.genres.map((genre) => genre.name).join(", ");
  }

  render() {
    let linkToImdb = `https://www.imdb.com/title/${this.state.film.imdbID}`;

    return (
      <div className={classes.FilmDetail}>
        {this.state.load ? (
          <div className="container">
            <div className={classes.FilmDetailWrapper}>
              <div className={classes.FilmDetailTop}>
                <div className={classes.FilmDetailImageWrapper}>
                  <img
                    className={classes.FilmDetailImage}
                    src={this.state.film.poster}
                    alt={this.state.film.title}
                  />
                </div>

                <div className={classes.FilmDetailRight}>
                  <h1>{this.state.film.title}</h1>
                  <p>{this.state.film.titleEn}</p>

                  <div className={classes.FilmDetailField}>
                    <div className={classes.FilmDetailFieldItem}>
                      <p className={classes.FilmDetailFieldItemName}>Год</p>
                      <p className={classes.FilmDetailFieldItemValue}>
                        {this.state.film.year}
                      </p>
                    </div>
                    <div className={classes.FilmDetailFieldItem}>
                      <p className={classes.FilmDetailFieldItemName}>Страна</p>
                      <p className={classes.FilmDetailFieldItemValue}>
                        {this.state.film.country}
                      </p>
                    </div>
                    <div className={classes.FilmDetailFieldItem}>
                      <p className={classes.FilmDetailFieldItemName}>imdbID</p>
                      <p className={classes.FilmDetailFieldItemValue}>
                        <a href={linkToImdb}>{this.state.film.imdbID}</a>
                      </p>
                    </div>
                    <div className={classes.FilmDetailFieldItem}>
                      <p className={classes.FilmDetailFieldItemName}>Жанры</p>
                      <p className={classes.FilmDetailFieldItemValue}>
                        {this.renderGenres()}
                      </p>
                    </div>
                  </div>

                  <a href="/" className={classes.FilmDetailLink}>
                    на главную
                  </a>
                </div>
              </div>
              <div className={classes.FilmDetailBottom}>
                <div className={classes.FilmDetailDescription}>
                  <p>Описание:</p>
                  <br />
                  <p>{this.state.film.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default FilmDetail;
