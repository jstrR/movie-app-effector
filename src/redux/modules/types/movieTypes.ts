import { IMovieObject, IComment } from "../../../utils/types";

import {
  SETACTIVEMOVIE,
  SETMOVIESDB,
  ADDCOMMENT,
  SORTBYRATING,
  SORTBYDATE,
} from "../../constants/movieConst";

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
