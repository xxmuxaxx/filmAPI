import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { movieUrl } from "core/helpers/catalogRouting";
import { FC, useState } from "react";
import { NavLink, useSearchParams } from "react-router";

import classes from "./movieCard.module.scss";

type MovieCardProps = {
  poster: string | null;
  filmName: string;
  title: string;
  filmYear: string | null;
  genre?: string;
  showButtons: boolean;
  onClickDeleteButton: () => void;
  onClickEditButton: () => void;
};

const MovieCard: FC<MovieCardProps> = ({
  poster,
  filmName,
  title,
  filmYear,
  genre,
  showButtons,
  onClickDeleteButton,
  onClickEditButton,
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
      {showButtons && (
        <div className={classes.buttons}>
          <Button
            aria-label={`Изменить фильм: ${filmName}`}
            onClick={onClickEditButton}
          >
            <EditOutlined />
          </Button>
          <Button
            aria-label={`Удалить фильм: ${filmName}`}
            onClick={onClickDeleteButton}
          >
            <DeleteOutlined />
          </Button>
        </div>
      )}
    </article>
  );
};

export default MovieCard;
