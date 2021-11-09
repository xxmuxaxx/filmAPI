import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons';
import { NavLink } from 'react-router-dom';
import Button from '../UI/Button/Button';
import classes from './FilmCard.module.scss';

const FilmCard = ({
  onClickDeleteButton,
  onClickEditButton,
  showButtons,
  ...props
}) => {
  return (
    <div className={classes.card}>
      <img src={props.poster} alt={props.filmName} />
      <div className={classes.hover} onMouseEnter={props.onMouseEnter}>
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
          <NavLink to={'/films/' + props.title}>
            <Button onClick={props.onClick}>Подробнее</Button>
          </NavLink>
          <h3>{props.filmName}</h3>
          <p>{props.filmYear}</p>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
