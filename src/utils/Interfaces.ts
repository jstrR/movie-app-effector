export interface IMovieObject {
  id: number;
  title: string;
  genres?: Array<string>;
  vote_average?: string;
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
  author: string;
  date: string;
  message: string;
}
