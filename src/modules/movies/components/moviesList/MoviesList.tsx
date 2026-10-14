import './moviesList.scss';

import { FC } from 'react';

import MovieCard from '../movieCard/MovieCard';

type MoviesListProps = {
  films: any[];
  showButtons: boolean;
  onClickDeleteButton: (id: string, title: string) => void;
  onClickEditButton: (id: string, title: string) => void;
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
          onClickEditButton={() => onClickEditButton(film.id, film.title)}
          onClickDeleteButton={() => onClickDeleteButton(film.id, film.title)}
          showButtons={showButtons}
        />
      ))}
    </div>
  );
};

export default MoviesList;
