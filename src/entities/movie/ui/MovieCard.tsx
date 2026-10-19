import { movieUrl } from "../lib/catalogRouting";
import { FC, useState, type ReactNode } from "react";
import { NavLink, useSearchParams } from "react-router";

import classes from "./movieCard.module.scss";

type MovieCardProps = {
  poster: string | null;
  filmName: string;
  title: string;
  filmYear: string | null;
  genre?: string;
  actions?: ReactNode;
};

const MovieCard: FC<MovieCardProps> = ({
  poster,
  filmName,
  title,
  filmYear,
  genre,
  actions,
}) => {
  const [failedPoster, setFailedPoster] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  return (
    <article className={classes.card}>
      <NavLink className={classes.link} to={movieUrl(title, searchParams)}>
        <div className={classes.poster}>
          {poster && failedPoster !== poster ? (
            <img
              src={poster}
              alt={filmName}
              loading="lazy"
              onError={() => setFailedPoster(poster)}
            />
          ) : (
            <div className={classes.fallback}>
              <span>КИНОТЕКА</span>
              <strong>{filmName}</strong>
              <span>КОЛЛЕКЦИЯ ФИЛЬМОВ</span>
            </div>
          )}
        </div>
        <div className={classes.info}>
          <h3 title={filmName}>{filmName}</h3>
          <p>
            {[filmYear, genre].filter(Boolean).join(" · ") ||
              "Подробнее о фильме"}
          </p>
        </div>
      </NavLink>
      {actions && <div className={classes.buttons}>{actions}</div>}
    </article>
  );
};

export default MovieCard;
