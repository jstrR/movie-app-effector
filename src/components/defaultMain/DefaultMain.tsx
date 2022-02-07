import React, { useEffect } from "react";
import { useStore } from "effector-react";

import MovieSort from "../movieSort/MovieSort";
import MoviesChart from "../moviesChart/MoviesChart";
import { $moviesStorage, fetchAllMoviesFx } from "../../effector/movie";

const DefaultMain = () => {
  const moviesStorage = useStore($moviesStorage);

  useEffect(() => {
    fetchAllMoviesFx();
  }, []);

  return (
    <main>
      <MovieSort />
      {moviesStorage.length ? (
        <MoviesChart moviesStorage={moviesStorage} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default DefaultMain;
