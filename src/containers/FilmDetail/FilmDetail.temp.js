import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Plyr from "plyr-react";

import classes from "./FilmDetail.module.scss";
import Loader from "../../components/Loader/Loader";
import FilmDetailFieldItem from "./FilmDetailFieldItem";
import { setActiveFilm } from "../../redux/actions/films";

function FilmDetail(props) {
  const dispatch = useDispatch();
  const ActiveFilm = useSelector(({ films }) => films.activeItem);
  const load = useSelector(({ films }) => films.isLoaded);

  let linkToImdb = `https://www.imdb.com/title/${ActiveFilm.imdbID}`;

  console.log(ActiveFilm);

  React.useEffect(() => {
    dispatch(setActiveFilm(props.match.params.title));
  }, [dispatch, props.match.params.title]);

  const template = () => (
    <div className="container">
      <div className={classes.FilmDetailWrapper}>
        <div className={classes.FilmDetailTop}>
          <div className={classes.FilmDetailImageWrapper}>
            <img
              className={classes.FilmDetailImage}
              src={ActiveFilm.poster}
              alt={ActiveFilm.title}
            />
          </div>

          <div className={classes.FilmDetailRight}>
            <h1>{ActiveFilm.title}</h1>
            <p>{ActiveFilm.titleEn}</p>

            <div className={classes.FilmDetailField}>
              <FilmDetailFieldItem name="Год">
                {ActiveFilm.year}
              </FilmDetailFieldItem>

              <FilmDetailFieldItem name="Страна">
                {ActiveFilm.country}
              </FilmDetailFieldItem>

              {/* <FilmDetailFieldItem name="Актеры">
                {this.state.imdbLoad ? this.state.imdb.Actors : "Загрузка..."}
              </FilmDetailFieldItem> */}

              <FilmDetailFieldItem name="IMDb">
                <a href={linkToImdb} target="_blank" rel="noopener noreferrer">
                  Перейти
                </a>
              </FilmDetailFieldItem>

              {/* <FilmDetailFieldItem name="Рейтинг IMDb">
                {this.state.imdbLoad
                  ? this.state.imdb.imdbRating
                  : "Загрузка..."}
              </FilmDetailFieldItem> */}

              {/* <FilmDetailFieldItem name="Metascore">
                {this.state.imdbLoad
                  ? this.state.imdb.Metascore
                  : "Загрузка..."}
              </FilmDetailFieldItem> */}

              {/* <FilmDetailFieldItem name="Жанры">
                {this.renderGenres()}
              </FilmDetailFieldItem> */}

              {/* <FilmDetailFieldItem name="Длительность">
                {this.state.imdbLoad ? this.state.imdb.Runtime : "Загрузка..."}
              </FilmDetailFieldItem> */}

              {/* <FilmDetailFieldItem name="Рейтинг">
                {this.state.imdbLoad ? this.state.imdb.Rated : "Загрузка..."}
              </FilmDetailFieldItem> */}
            </div>

            <Link to="/" className={classes.FilmDetailLink}>
              на главную
            </Link>
          </div>
        </div>

        {/* <div className="plyr-wrapper">
          {this.videoId ? (
            <Plyr
              source={{
                type: "video",
                sources: [
                  {
                    src: this.state.videoId,
                    provider: "youtube",
                  },
                ],
              }}
            />
          ) : (
            <Plyr />
          )}
        </div> */}

        <div className={classes.FilmDetailBottom}>
          <div className={classes.FilmDetailDescription}>
            <p>Описание:</p>
            <br />
            {/* <p>{this.state.film.description}</p> */}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.FilmDetail}>{load ? template() : <Loader />}</div>
  );
}

class FilmDetailh extends Component {
  state = {
    film: [],
    load: false,
    imdb: [],
    imdbLoad: false,
  };

  async tempFetch() {
    console.log("API GET FILM");
    const title = this.props.match.params.title;
    const url = "https://film-api-backend.herokuapp.com/movies/";

    fetch(`${url}find?title=${title}`)
      .then((res) => res.json())
      .then((result) =>
        this.setState({ film: result.search[0], load: true }, () =>
          this.imdbID()
        )
      );
  }

  async componentDidMount() {
    this.tempFetch();
  }

  async imdbID() {
    console.log("API GET FILM IMDB");
    const imdbID = this.state.film.imdbID;
    const url = "https://movie-database-imdb-alternative.p.rapidapi.com/";
    const host = "movie-database-imdb-alternative.p.rapidapi.com";
    const key = "421df21564mshec026f33dbed2d1p17da9djsn5014d3c84f92";

    fetch(`${url}?i=${imdbID}&r=json`, {
      method: "GET",
      headers: { "x-rapidapi-host": host, "x-rapidapi-key": key },
    })
      .then((response) => response.json())
      .then((result) => this.setState({ imdb: result, imdbLoad: true }))
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
                <FilmDetailFieldItem name="Год">
                  {this.state.film.year}
                </FilmDetailFieldItem>

                <FilmDetailFieldItem name="Страна">
                  {this.state.film.country}
                </FilmDetailFieldItem>

                <FilmDetailFieldItem name="Актеры">
                  {this.state.imdbLoad ? this.state.imdb.Actors : "Загрузка..."}
                </FilmDetailFieldItem>

                <FilmDetailFieldItem name="IMDb">
                  <a
                    href={linkToImdb}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Перейти
                  </a>
                </FilmDetailFieldItem>

                <FilmDetailFieldItem name="Рейтинг IMDb">
                  {this.state.imdbLoad
                    ? this.state.imdb.imdbRating
                    : "Загрузка..."}
                </FilmDetailFieldItem>

                <FilmDetailFieldItem name="Metascore">
                  {this.state.imdbLoad
                    ? this.state.imdb.Metascore
                    : "Загрузка..."}
                </FilmDetailFieldItem>

                <FilmDetailFieldItem name="Жанры">
                  {this.renderGenres()}
                </FilmDetailFieldItem>

                <FilmDetailFieldItem name="Длительность">
                  {this.state.imdbLoad
                    ? this.state.imdb.Runtime
                    : "Загрузка..."}
                </FilmDetailFieldItem>

                <FilmDetailFieldItem name="Рейтинг">
                  {this.state.imdbLoad ? this.state.imdb.Rated : "Загрузка..."}
                </FilmDetailFieldItem>
              </div>

              <Link to="/" className={classes.FilmDetailLink}>
                на главную
              </Link>
            </div>
          </div>

          <div className="plyr-wrapper">
            {this.videoId ? (
              <Plyr
                source={{
                  type: "video",
                  sources: [
                    {
                      src: this.state.videoId,
                      provider: "youtube",
                    },
                  ],
                }}
              />
            ) : (
              <Plyr />
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
