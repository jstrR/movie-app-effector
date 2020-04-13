import { IMovieObject, IComment } from "../../../utils/types";

export const SETACTIVEMOVIE = "movie/setActive";
export const SETMOVIESDB = "movie/setMoviesDb";
export const ADDCOMMENT = "movie/addComment";
export const SORTBYRATING = "movie/sortByRating";
export const SORTBYDATE = "movie/sortByDate";

interface setActiveMovieAction {
  type: typeof SETACTIVEMOVIE;
  payload: IMovieObject | undefined;
}

interface setMoviesDbAction {
  type: typeof SETMOVIESDB;
  payload: Array<IMovieObject>;
}

interface addCommentAction {
  type: typeof ADDCOMMENT;
  payload: IComment;
}

interface sortByRatingAction {
  type: typeof SORTBYRATING;
  payload: string;
}

interface sortByDateAction {
  type: typeof SORTBYDATE;
  payload: string;
}

export interface movieState {
  activeMovie: IMovieObject | {};
  moviesStorage: Array<IMovieObject>;
}

export type movieActionTypes =
  | setActiveMovieAction
  | setMoviesDbAction
  | addCommentAction
  | sortByRatingAction
  | sortByDateAction;
