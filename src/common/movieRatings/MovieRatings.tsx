import React from "react";
import Rating from "@material-ui/lab/Rating";

import { setNewRating } from "../../effector/auth";
import { IMovieRatings } from "../../utils/types";

const MovieRatings: React.FC<IMovieRatings> = (props) => {
  const setNewMovieRating = (e: React.SyntheticEvent<EventTarget>) => {
    if (props.movieid) {
      setNewRating({ [props.movieid]: (e.target as HTMLInputElement).value })
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
        onChange={setNewMovieRating}
      />
    </>
  );
};

export default MovieRatings;
