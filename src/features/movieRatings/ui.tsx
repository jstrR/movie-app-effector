import React from "react";
import Rating from "@material-ui/lab/Rating";

import { userModel } from "entities/user";
import { MovieRatings as IMovieRatings } from "shared/api";

export const MovieRatings: React.FC<IMovieRatings> = ({ movieId, ...props}) => {
  const setNewMovieRating = (e: React.SyntheticEvent<EventTarget>) => {
    if (movieId) {
      userModel.setNewRating({ ...props, movieId, rating: Number((e.target as HTMLInputElement).value) })
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
