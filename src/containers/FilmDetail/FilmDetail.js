import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Plyr from "plyr-react";

import classes from "./FilmDetail.module.scss";
import Loader from "../../components/Loader/Loader";
import FilmDetailFieldItem from "./FilmDetailFieldItem";
import { fetchFilmByTitle } from "../../redux/actions/films";
import IMDBAlternative from "../../axios/axiosIMDBAlternative";

const FilmDetail = React.memo(function FilmDetail(props) {
  const dispatch = useDispatch();
  const { activeItem, isLoaded } = useSelector(({ films }) => films);

  const [imdb, setImdb] = React.useState({ item: [], loaded: false });
  const linkToImdb = `https://www.imdb.com/title/${activeItem.imdbID}`;

  React.useEffect(() => {
    activeItem.title === props.match.params.title
      ? getIMDB()
      : dispatch(fetchFilmByTitle(props.match.params.title)).then(getIMDB());

    function getIMDB() {
      IMDBAlternative.get(`?i=${activeItem.imdbID}&r=json`).then(({ data }) => {
        console.log("API GET FILM IMDB");
        setImdb({ item: data, loaded: true });
      });
    }
  }, [activeItem.imdbID, activeItem.title, dispatch, props.match.params.title]);

  const template = () => (
    <div className="container">
      <div className={classes.FilmDetailWrapper}>
        <div className={classes.FilmDetailTop}>
          <div className={classes.FilmDetailImageWrapper}>
            <img
              className={classes.FilmDetailImage}
              src={activeItem.poster}
              alt={activeItem.title}
            />
          </div>

          <div className={classes.FilmDetailRight}>
            <h1>{activeItem.title}</h1>
            <p>{activeItem.titleEn}</p>

            <div className={classes.FilmDetailField}>
              <FilmDetailFieldItem name="Год">
                {activeItem.year}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Страна">
                {activeItem.country}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Актеры">
                {imdb.loaded ? imdb.item.Actors : "Загрузка..."}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="IMDb">
                <a href={linkToImdb} target="_blank" rel="noopener noreferrer">
                  Перейти
                </a>
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Рейтинг IMDb">
                {imdb.loaded ? imdb.item.imdbRating : "Загрузка..."}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Metascore">
                {imdb.loaded ? imdb.item.Metascore : "Загрузка..."}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Жанры">
                {activeItem.genres.map((genre) => genre.name).join(", ")}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Длительность">
                {imdb.loaded ? imdb.item.Runtime : "Загрузка..."}
              </FilmDetailFieldItem>
              <FilmDetailFieldItem name="Рейтинг">
                {imdb.loaded ? imdb.item.Rated : "Загрузка..."}
              </FilmDetailFieldItem>
            </div>

            <Link to="/" className={classes.FilmDetailLink}>
              Назад
            </Link>
          </div>
        </div>

        <div className="plyr-wrapper">
          <Plyr />
        </div>

        <div className={classes.FilmDetailBottom}>
          <div className={classes.FilmDetailDescription}>
            <p>Описание:</p>
            <br />
            <p>{activeItem.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.FilmDetail}>
      {isLoaded ? template() : <Loader />}
    </div>
  );
});

export default FilmDetail;
