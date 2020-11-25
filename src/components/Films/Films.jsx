import React from "react";

import FilmCard from "../FilmCard/FilmCard";
import classes from "./Films.module.scss";

const Films = ({films, onClickDeleteButton, onClickEditButton, showButtons}) => {
    return (
        <div className={classes.films}>
            {films.map((film) => <FilmCard
                key={film.id}
                title={film.title}
                poster={film.poster}
                filmName={film.title}
                filmYear={film.year}
                onClickEditButton={() => onClickEditButton(film.id, film.title)}
                onClickDeleteButton={() => onClickDeleteButton(film.id, film.title)}
                showButtons={showButtons}
            />)}
        </div>
    )
}

export default Films