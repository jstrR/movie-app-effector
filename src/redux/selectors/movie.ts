import { IMovieObject } from "../../utils/types";

interface IActiveMovieSelector {
  movie: {
    activeMovie?: IMovieObject;
  };
}

interface IMoviesStorageSelector {
  movie: {
    moviesStorage?: Array<IMovieObject>;
  };
}

export const selectActiveMovie = (
  state: IActiveMovieSelector
): IMovieObject | undefined => {
  return state.movie.activeMovie;
};

export const selectMoviesStorage = (
  state: IMoviesStorageSelector
): Array<IMovieObject> | undefined => {
  return state.movie.moviesStorage;
};
