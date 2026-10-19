import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./moviesList.scss";

import { Movie } from "entities/movie";
import { FC } from "react";

import { MovieCard } from "entities/movie";

type MoviesListProps = {
  films: Movie[];
  showButtons: boolean;
  onClickDeleteButton: (id: number, title: string) => void;
  onClickEditButton: (id: number, title: string) => void;
};

const MoviesList: FC<MoviesListProps> = ({
  films,
  showButtons,
  onClickDeleteButton,
  onClickEditButton,
}) => {
  return (
    <div className="movies-list">
      {films.map((film) => (
        <MovieCard
          key={film.id}
          title={film.title}
          poster={film.poster}
          filmName={film.title}
          filmYear={film.year}
          genre={film.genres[0]?.name}
          actions={
            showButtons ? (
              <>
                <Button
                  aria-label={`Изменить фильм: ${film.title}`}
                  onClick={() => onClickEditButton(film.id, film.title)}
                >
                  <EditOutlined />
                </Button>
                <Button
                  aria-label={`Удалить фильм: ${film.title}`}
                  onClick={() => onClickDeleteButton(film.id, film.title)}
                >
                  <DeleteOutlined />
                </Button>
              </>
            ) : undefined
          }
        />
      ))}
    </div>
  );
};

export default MoviesList;
