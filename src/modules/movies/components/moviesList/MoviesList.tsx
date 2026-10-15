import './moviesList.scss';

import { Movie } from 'core/modules/movie/types/movieTypes';
import { FC } from 'react';

import MovieCard from '../movieCard/MovieCard';

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
          onClickEditButton={() => onClickEditButton(film.id, film.title)}
          onClickDeleteButton={() => onClickDeleteButton(film.id, film.title)}
          showButtons={showButtons}
        />
      ))}
    </div>
  );
};

export default MoviesList;
