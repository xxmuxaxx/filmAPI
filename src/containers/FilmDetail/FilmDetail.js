import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import Plyr from "plyr-react";
import classes from "./FilmDetail.module.scss";
import { Link } from "react-router-dom";

class FilmDetail extends Component {
  state = {
    film: [],
    load: false,
  };

  async componentDidMount() {
    const title = this.props.match.params.title;
    const url = "https://salty-lowlands-03006.herokuapp.com/movies/";

    fetch(`${url}find?title=${title}`)
      .then((res) => res.json())
      .then((result) => this.setState({ film: result.search[0], load: true }));
  }

  async componentDidUpdate() {
    const title = this.props.match.params.title;
    const url = "https://salty-lowlands-03006.herokuapp.com/movies/";

    fetch(`${url}find?title=${title}`)
      .then((res) => res.json())
      .then((result) => this.setState({ film: result.search[0], load: true }));
  }

  async getFilmYouTubeTrailerUrl() {
    fetch(
      `https://imdb-api.com/en/API/YouTubeTrailer/k_zMYl86E1/${this.state.film.imdbID}`
    )
      .then((response) => response.json())
      .then((result) => {
        const videoId = result.videoId;

        this.setState({
          film: { ...this.state.film, videoId },
          load: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async imdbID() {
    const imdbID = this.props.match.params.title;
    const url = "https://movie-database-imdb-alternative.p.rapidapi.com/";
    const host = "movie-database-imdb-alternative.p.rapidapi.com";
    const key = "421df21564mshec026f33dbed2d1p17da9djsn5014d3c84f92";

    fetch(`${url}?i=${imdbID}&r=json`, {
      method: "GET",
      headers: { "x-rapidapi-host": host, "x-rapidapi-key": key },
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  renderGenres() {
    return this.state.film.genres.map((genre) => genre.name).join(", ");
  }

  render() {
    let linkToImdb = `https://www.imdb.com/title/${this.state.film.imdbID}`;

    const template = () => (
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

              <Link to="/" className={classes.FilmDetailLink}>
                на главную
              </Link>
            </div>
          </div>

          <div className="plyr-wrapper">
            {this.state.film.videoId && (
              <Plyr
                source={{
                  type: "video",
                  sources: [
                    {
                      src: this.state.film.videoId,
                      provider: "youtube",
                    },
                  ],
                }}
              />
            )}
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
    );

    return (
      <div className={classes.FilmDetail}>
        {this.state.load ? template() : <Loader />}
      </div>
    );
  }
}

export default FilmDetail;
