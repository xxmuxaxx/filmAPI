// Контракты сверены с filmapi: MovieItem, MovieDTO, MoviesPageDTO

export interface MovieDTOPaging extends MovieDTO {
  currentSize: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface MovieDTO {
  response: boolean;
  search: Movie[];
  totalResults: number;
}

export type MovieType = "movie" | "series";

export interface Movie {
  id: number;
  title: string;
  titleEn: string | null;
  year: string | null;
  imdbID: string | null;
  type: MovieType | null;
  poster: string | null;
  description: string | null;
  country: string | null;
  video: string | null;
  genres: GenreItem[];
}

export type MovieForm = Omit<Movie, "id">;

/** Значения antd-форм фильма: жанры вводятся строкой через запятую */
export interface MovieFormValues extends Partial<Omit<MovieForm, "genres">> {
  genres?: string;
}

export interface GenreItem {
  name: string;
}
