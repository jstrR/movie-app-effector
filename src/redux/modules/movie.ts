import { movieActionTypes, movieState } from "./types/movieTypes";
import {
  SETACTIVEMOVIE,
  SETMOVIESDB,
  ADDCOMMENT,
  SORTBYRATING,
  SORTBYDATE,
} from "../constants/movieConst";
import { IMovieObject, IComment } from "../../utils/types";

export const setActiveMovie = (
  value: IMovieObject | undefined
): movieActionTypes => ({
  type: SETACTIVEMOVIE,
  payload: value,
});

export const setMoviesDb = (value: Array<IMovieObject>): movieActionTypes => ({
  type: SETMOVIESDB,
  payload: value,
});

export const addComment = (comment: IComment): movieActionTypes => ({
  type: ADDCOMMENT,
  payload: comment,
});

export const sortByRating = (type: string): movieActionTypes => ({
  type: SORTBYRATING,
  payload: type,
});

export const sortByDate = (type: string): movieActionTypes => ({
  type: SORTBYDATE,
  payload: type,
});

export const initialState: movieState = {
  activeMovie: {},
  moviesStorage: localStorage.getItem("moviesDb")
    ? JSON.parse(localStorage.getItem("moviesDb") || "")
    : [],
};

const reducer = (state = initialState, action: movieActionTypes) => {
  switch (action.type) {
    case SETACTIVEMOVIE: {
      return { ...state, activeMovie: action.payload };
    }
    case SETMOVIESDB: {
      return { ...state, moviesStorage: action.payload };
    }
    case ADDCOMMENT: {
      const movieDb = localStorage.getItem("moviesDb")
        ? JSON.parse(localStorage.getItem("moviesDb") || "")
        : [];
      const movieToUpdate = movieDb.find(
        (movie: IMovieObject) => Number(action.payload.movieId) === movie.id
      );
      movieToUpdate.comments.unshift(action.payload);
      const updatedMoviesStorage = movieDb.map((movie: IMovieObject) =>
        movieToUpdate.id === movie.id ? { ...movieToUpdate } : movie
      );
      localStorage.setItem("moviesDb", JSON.stringify(updatedMoviesStorage));
      return {
        ...state,
        activeMovie: movieToUpdate,
        moviesStorage: updatedMoviesStorage,
      };
    }
    case SORTBYRATING: {
      const sortedMoviesStorage = [...state.moviesStorage];
      sortedMoviesStorage.sort((a, b) =>
        action.payload === "asc"
          ? Number(a.vote_average) - Number(b.vote_average)
          : Number(b.vote_average) - Number(a.vote_average)
      );
      return { ...state, moviesStorage: sortedMoviesStorage };
    }
    case SORTBYDATE: {
      const sortedMoviesStorage = [...state.moviesStorage];
      sortedMoviesStorage.sort((a, b) => {
        let dateA = new Date(a.release_date || ""),
          dateB = new Date(b.release_date || "");
        return action.payload === "asc"
          ? Number(dateA) - Number(dateB)
          : Number(dateB) - Number(dateA);
      });
      return { ...state, moviesStorage: sortedMoviesStorage };
    }
    default:
      return state;
  }
};

export default reducer;
