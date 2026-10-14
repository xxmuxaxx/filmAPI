import Loader from "core/components/loader/Loader";
import { useActions } from "core/hooks/useActions";
import {
  formatGenres,
  movieTypeLabels,
} from "core/modules/movie/helpers/movieForm";
import { selectMovieState } from "core/modules/movie/selectors/movieSelectors";
import { Movie } from "core/modules/movie/types/movieTypes";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

import classes from "./moviePage.module.scss";

const MoviePage: FC = React.memo(() => {
  const { fetchMovieByTitle, setActiveMovie } = useActions();
  const { title } = useParams<"title">();
  const { activeItem } = useSelector(selectMovieState);

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
    if (title) fetchMovieByTitle(title);

    return () => {
      setActiveMovie(null);
    };
  }, [fetchMovieByTitle, setActiveMovie, title]);

  const template = (movie: Movie) => (
    <div className="container">
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <div className={classes.img}>
            <img
              className={classes.image}
              src={movie.poster ?? undefined}
              alt={movie.title}
            />
            <Link to="/films" className={classes.link}>
              Назад
            </Link>
          </div>

          <div className={classes.right}>
            <h1>{movie.title}</h1>
            <p>{movie.titleEn}</p>
            <span className={classes.id}>id: {movie.id}</span>

            <div className={classes.field}>
              {[
                { name: "Год", value: movie.year },
                { name: "Тип", value: movie.type && movieTypeLabels[movie.type] },
                { name: "Страна", value: movie.country },
                {
                  name: "IMDb",
                  value: movie.imdbID && linkToImdb(movie.imdbID),
                },
                { name: "Жанры", value: formatGenres(movie.genres) },
                { name: "Описание", value: movie.description },
              ].map(({ name, value }) => (
                <div key={name} className={classes.item}>
                  <p className={classes.name}>{name}</p>
                  <p className={classes.value}>{value || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {movie.video && (
          <div className={classes.bottom}>
            <div className={classes.video}>
              <iframe
                src={`https://www.youtube.com/embed/${movie.video}`}
                frameBorder="0"
                title="video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={classes.wrapper}>
      {activeItem ? template(activeItem) : <Loader />}
    </div>
  );
});

export default MoviePage;
