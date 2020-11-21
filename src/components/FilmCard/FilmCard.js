import React from "react";

import {NavLink} from "react-router-dom";
import Button from "../UI/Button/Button";
import {DeleteOutlined, EditOutlined} from "@material-ui/icons";

import classes from "./FilmCard.module.scss";

const FilmCard = ({onClickDeleteButton, onClickEditButton, showButtons, ...props}) => {
    return (
        <div className={classes.Card}>
            <img src={props.poster} alt={props.filmName}/>
            <div className={classes.Hover} onMouseEnter={props.onMouseEnter}>
                {
                    showButtons &&
                    <div className={classes.Buttons}>
                        <Button onClick={onClickEditButton}>
                            <EditOutlined/>
                        </Button>
                        <Button onClick={onClickDeleteButton}>
                            <DeleteOutlined/>
                        </Button>
                    </div>
                }
                <div className={classes.Info}>
                    <NavLink to={"/films/" + props.title}>
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
