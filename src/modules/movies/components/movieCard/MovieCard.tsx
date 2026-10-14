import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Button from "core/components/button/Button";
import { env } from "core/helpers/environment";
import { FC } from "react";
import { NavLink } from "react-router";

import classes from "./movieCard.module.scss";

type MovieCardProps = {
  poster: string | null;
  filmName: string;
  title: string;
  filmYear: string | null;
  showButtons: boolean;
  onClickDeleteButton: () => void;
  onClickEditButton: () => void;
};

const MovieCard: FC<MovieCardProps> = ({
  poster,
  filmName,
  title,
  filmYear,
  showButtons,
  onClickDeleteButton,
  onClickEditButton,
}) => {
  return (
    <div className={classes.card}>
      <img src={poster ?? undefined} alt={filmName} />
      <div className={classes.hover}>
        {showButtons && (
          <div className={classes.buttons}>
            <Button onClick={onClickEditButton}>
              <EditOutlined />
            </Button>
            <Button onClick={onClickDeleteButton}>
              <DeleteOutlined />
            </Button>
          </div>
        )}
        <div className={classes.info}>
          <NavLink to={`${env.films.baseUrl}/${title}`}>
            <Button>Подробнее</Button>
          </NavLink>
          <h3>{filmName}</h3>
          <p>{filmYear}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
