import React, { useEffect } from "react";
import { useStore } from "effector-react";

import MovieSort from "../movieSort/MovieSort";
import MoviesChart from "../moviesChart/MoviesChart";
import movieData from "../../utils/movieData";
import { $moviesStorage, setMoviesDb } from "../../effector/movie";
import { IMovieObject } from "../../utils/types";

const DefaultMain = () => {
  const moviesStorage: Array<IMovieObject> | [] | null= useStore($moviesStorage);

  useEffect(() => {
    if (moviesStorage && moviesStorage.length) return;
    const currentMoviesDb = localStorage.getItem("moviesDb")
      ? JSON.parse(localStorage.getItem("moviesDb") || "")
      : [];
    if (!currentMoviesDb || !currentMoviesDb.length) {
      localStorage.setItem("moviesDb", JSON.stringify(movieData));
      setMoviesDb(movieData);
    } else setMoviesDb(currentMoviesDb);
  }, [moviesStorage]);

  return (
    <main>
      <MovieSort />
      {moviesStorage ? (
        <MoviesChart moviesStorage={moviesStorage} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default DefaultMain;
