import Loader from 'core/components/loader/Loader';
import { useActions } from 'core/hooks/useActions';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import classes from './moviePage.module.scss';

const MoviePage: FC = React.memo(() => {
  const { fetchMovieByTitle, setActiveMovie } = useActions();
  const { title } = useParams<{ title: string }>();
  const { activeItem } = useSelector(({ movie }: any) => movie);

  const linkToImdb = (imdbID: string) => (
    <a
      href={`https://www.imdb.com/title/${imdbID}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Перейти
    </a>
  );

  useEffect(() => {
    fetchMovieByTitle(title);

    return () => {
      setActiveMovie(null);
    };
  }, [title]);

  const template = () => (
    <div className="container">
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <div className={classes.img}>
            <img
              className={classes.image}
              src={activeItem.poster}
              alt={activeItem.title}
            />
            <Link to="/films" className={classes.link}>
              Назад
            </Link>
          </div>

          <div className={classes.right}>
            <h1>{activeItem.title}</h1>
            <p>{activeItem.titleEn}</p>
            <span className={classes.id}>id: {activeItem.id}</span>

            <div className={classes.field}>
              {[
                { name: 'год', value: activeItem.year },
                { name: 'Страна', value: activeItem.country },
                { name: 'Актеры', value: activeItem.Actors },
                { name: 'IMDb', value: linkToImdb(activeItem?.imdbID) },
                { name: 'Рейтинг IMDb', value: activeItem.imdbRating },
                { name: 'Metascore', value: activeItem.Metascore },
                { name: 'Жанры', value: activeItem.Genre },
                { name: 'Длительность', value: activeItem.Runtime },
                { name: 'Рейтинг', value: activeItem.Rated },
                { name: 'Описание', value: activeItem.description },
              ].map(({ name, value }) => (
                <div key={`${name}-${value}`} className={classes.item}>
                  <p className={classes.name}>{name}</p>
                  <p className={classes.value}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.video}>
            <iframe
              src={`https://www.youtube.com/embed/${activeItem.video}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.wrapper}>
      {activeItem ? template() : <Loader />}
    </div>
  );
});

export default MoviePage;
