import { Button, Result } from "antd";
import Loader from "core/components/loader/Loader";
import { useAppDispatch } from "core/configureStore";
import { env } from "core/helpers/environment";
import { useActions } from "core/hooks/useActions";
import { getErrorMessage } from "core/http";
import { movieTypeLabels } from "core/modules/movie/helpers/movieForm";
import { fetchMovieByTitle } from "core/modules/movie/actions/movieActions";
import { selectMovieState } from "core/modules/movie/selectors/movieSelectors";
import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

import classes from "./moviePage.module.scss";

const MoviePage: FC = () => {
  const { setActiveMovie } = useActions();
  const dispatch = useAppDispatch();
  const { title } = useParams<"title">();
  const { activeItem: movie } = useSelector(selectMovieState);
  const [request, setRequest] = useState<{ title?: string; error?: string; found: boolean } | null>(null);
  const [failedPoster, setFailedPoster] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const trailerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    if (title) {
      dispatch(fetchMovieByTitle(title)).then(found => {
        if (!cancelled) setRequest({ title, found: Boolean(found) });
      }).catch((error: unknown) => {
        if (!cancelled) setRequest({ title, found: false, error: getErrorMessage(error) });
      });
    }
    return () => {
      cancelled = true;
      setActiveMovie(null);
    };
  }, [dispatch, setActiveMovie, title]);

  if (request?.title !== title) return <Loader />;
  if (!request?.found || !movie) {
    return <Result status={request?.error ? "error" : "404"}
      title={request?.error ? "Не удалось загрузить фильм" : "Фильм не найден"}
      subTitle={request?.error || "Вернитесь в каталог и выберите другой фильм."}
      extra={<Link to={env.films.baseUrl}>Все фильмы</Link>} />;
  }

  const typeLabel = movie.type ? movieTypeLabels[movie.type] : "Тип не указан";
  const showTrailer = () => trailerRef.current?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });

  return (
    <div className={classes.page}>
      <nav className={classes.breadcrumb} aria-label="Навигация">
        <Link to={env.films.baseUrl}>← Все фильмы</Link>
        <span>/ {movie.title}</span>
      </nav>

      <section className={classes.overview} aria-labelledby="movie-title">
        <div className={classes.poster}>
          {movie.poster && failedPoster !== movie.poster ? (
            <img src={movie.poster} alt={movie.title} onError={() => setFailedPoster(movie.poster)} />
          ) : (
            <div className={classes.posterFallback}>
              <span>КИНОТЕКА</span>
              <strong>{movie.title}</strong>
              <span>{movie.year || "КОЛЛЕКЦИЯ ФИЛЬМОВ"}</span>
            </div>
          )}
        </div>
        <div className={classes.details}>
          <div className={classes.eyebrow}><span>{typeLabel}</span><span>{movie.year}</span></div>
          <div className={classes.titles}>
            <h1 id="movie-title">{movie.title}</h1>
            {movie.titleEn && <p>{movie.titleEn}</p>}
          </div>
          {movie.genres.length > 0 && <ul className={classes.genres} aria-label="Жанры">
            {movie.genres.map(genre => <li key={genre.name}>{genre.name}</li>)}
          </ul>}
          <dl className={classes.metadata}>
            <div><dt>Год выпуска</dt><dd>{movie.year || "—"}</dd></div>
            <div><dt>Страна</dt><dd>{movie.country || "—"}</dd></div>
            <div><dt>Тип</dt><dd>{typeLabel}</dd></div>
          </dl>
          <div className={classes.actions}>
            {movie.video && <Button type="primary" onClick={showTrailer}>Смотреть трейлер</Button>}
            {movie.imdbID && <a href={`https://www.imdb.com/title/${encodeURIComponent(movie.imdbID)}`}
              target="_blank" rel="noopener noreferrer">Страница на IMDb ↗</a>}
          </div>
          <p className={classes.id}>ID фильма: {movie.id}</p>
        </div>
      </section>

      <section className={classes.section} aria-labelledby="movie-description">
        <div className={classes.sectionHeading}><h2 id="movie-description">О фильме</h2><span className={classes.accent} /></div>
        <p className={classes.description}>{movie.description || "Описание фильма пока не добавлено."}</p>
      </section>

      {movie.video && <section ref={trailerRef} className={classes.section} aria-labelledby="movie-trailer">
        <div className={classes.sectionHeading}>
          <h2 id="movie-trailer">Трейлер</h2>
          <p>Посмотрите, с чего<br />начинается путешествие.</p>
        </div>
        <div className={classes.video}>
          {playingVideo === movie.video ? <iframe
            src={`https://www.youtube.com/embed/${encodeURIComponent(movie.video)}?autoplay=1`}
            title={`Трейлер: ${movie.title}`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : (
            <button className={classes.videoPreview} onClick={() => setPlayingVideo(movie.video)} aria-label={`Смотреть трейлер: ${movie.title}`}>
              <strong>{movie.titleEn || movie.title}</strong>
              <img src="/images/icons/trailer-play.svg" width="64" height="64" alt="" />
              <span>Смотреть трейлер</span>
            </button>
          )}
        </div>
      </section>}
    </div>
  );
};

export default MoviePage;
