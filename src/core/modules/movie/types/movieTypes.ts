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

export interface Movie {
  country: string;
  description: string;
  genres: GenreItem[];
  id: number;
  imdbID: string;
  poster: string;
  title: string;
  titleEn: string;
  type: 'movie' | 'series';
  video: string;
  year: string | number;
}

export type MovieForm = Omit<Movie, 'id'>;

export interface GenreItem {
  [key: string]: string;
}
