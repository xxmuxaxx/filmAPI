import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons';
import Button from 'core/components/button/Button';
import { env } from 'core/helpers/environment';
import React, { VFC } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './movieCard.module.scss';

type MovieCardProps = {
  poster: string;
  filmName: string;
  title: string;
  filmYear: string;
  showButtons: boolean;
  onClickDeleteButton: () => void;
  onClickEditButton: () => void;
};

const MovieCard: VFC<MovieCardProps> = ({
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
      <img src={poster} alt={filmName} />
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
