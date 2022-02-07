import React from "react";
import Rating from "@material-ui/lab/Rating";

import { setNewRating } from "../../effector/auth";
import { MovieRatings as IMovieRatings } from "../../api/model.graphql";

const MovieRatings: React.FC<IMovieRatings> = ({ movieId, ...props}) => {
  const setNewMovieRating = (e: React.SyntheticEvent<EventTarget>) => {
    if (movieId) {
      setNewRating({ ...props, movieId, rating: Number((e.target as HTMLInputElement).value) })
    }
  };

  return (
    <>
      <Rating
        {...props}
        name="movieRating"
        value={Number(props.rating) || null}
        max={Number(props.maxrating)}
        precision={0.5}
        disabled={!!props.disabled}
        onChange={setNewMovieRating}
      />
    </>
  );
};

export default MovieRatings;
