import React from "react";
import Rating from "@material-ui/lab/Rating";
import { useDispatch } from "react-redux";

import { setNewMovieRating, updateUsersDb } from "../../redux/modules/auth";
import { IMovieRatings } from "../../utils/types";

const MovieRatings: React.FC<IMovieRatings> = (props) => {
  const dispatch = useDispatch();
  const setNewRating = (e: React.SyntheticEvent<EventTarget>) => {
    if (props.movieid) {
      dispatch(
        setNewMovieRating({
          [props.movieid]: (e.target as HTMLInputElement).value,
          rating: props.rating || 0,
        })
      );
      dispatch(updateUsersDb());
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
        onChange={setNewRating}
      />
    </>
  );
};

export default MovieRatings;
