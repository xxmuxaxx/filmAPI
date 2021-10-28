import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './FilmDetail.module.scss';
import Loader from '../../components/Loader/Loader';
import FilmDetailFieldItem from './FilmDetailFieldItem';
import { fetchFilmByTitle, setActiveFilm } from '../../redux/actions/films';

const FilmDetail = React.memo(function FilmDetail(props) {
  const dispatch = useDispatch();

  const { activeItem } = useSelector(({ films }) => films);
  const linkToImdb = (imdbID) => (
    <a
      href={`https://www.imdb.com/title/${imdbID}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Перейти
    </a>
  );

  React.useEffect(() => {
    dispatch(fetchFilmByTitle(props.match.params.title));

    return () => dispatch(setActiveFilm(null));
  }, [dispatch, props.match.params.title]);

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
            <Link to="/films" className={classes.FilmDetailLink}>
              Назад
            </Link>
          </div>

          <div className={classes.FilmDetailRight}>
            <h1>{activeItem.title}</h1>
            <p>{activeItem.titleEn}</p>
            <span className={classes.id}>id: {activeItem.id}</span>

            <div className={classes.FilmDetailField}>
              <FilmDetailFieldItem name="Год" value={activeItem.year} />
              <FilmDetailFieldItem name="Страна" value={activeItem.country} />
              <FilmDetailFieldItem name="Актеры" value={activeItem.Actors} />
              <FilmDetailFieldItem
                name="IMDb"
                value={linkToImdb(activeItem?.imdbID)}
              />
              <FilmDetailFieldItem
                name="Рейтинг IMDb"
                value={activeItem.imdbRating}
              />
              <FilmDetailFieldItem
                name="Metascore"
                value={activeItem.Metascore}
              />
              <FilmDetailFieldItem name="Жанры" value={activeItem.Genre} />
              <FilmDetailFieldItem
                name="Длительность"
                value={activeItem.Runtime}
              />
              <FilmDetailFieldItem name="Рейтинг" value={activeItem.Rated} />
              <FilmDetailFieldItem
                name="Описание"
                value={activeItem.description}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.FilmDetail}>
      {activeItem ? template() : <Loader />}
    </div>
  );
});

export default FilmDetail;
