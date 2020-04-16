export interface IMovieObject {
  id: number;
  title: string;
  genres?: Array<string>;
  vote_average?: number;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  budget?: number;
  revenue?: number;
  runtime?: number;
  trailerUrl?: string;
  price?: number;
  places?: string;
  comments?: Array<IComment>;
  cinemas?: Array<object>;
}

export interface IUserObj {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string;
  token?: string;
}

export interface IComment {
  movieId: string | null;
  author?: string;
  date: Date;
  message: string;
}

export interface IMovieRatingObject {
  [key: number]: string | null;
}

export interface IMovieRatings extends IMovieRatingObject {
  movieid: number | null;
  rating: number;
  maxrating: number;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export interface ISessionObject {
  cinema: string;
  time: string;
}

export interface IUserStatus {
  isAuthenticated: boolean;
  token?: string;
}
