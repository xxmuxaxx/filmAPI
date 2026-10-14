import { GenreItem, MovieType } from '../types/movieTypes';

/** "драма, комедия" -> [{ name: 'драма' }, { name: 'комедия' }] */
export const parseGenres = (value?: string | null): GenreItem[] =>
  (value ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({ name }));

export const formatGenres = (genres?: GenreItem[] | null) =>
  (genres ?? []).map(({ name }) => name.trim()).join(', ');

export const movieTypeLabels: Record<MovieType, string> = {
  movie: 'Фильм',
  series: 'Сериал',
};

export const movieTypeOptions = (
  Object.entries(movieTypeLabels) as [MovieType, string][]
).map(([value, label]) => ({ value, label }));
