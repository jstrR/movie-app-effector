import React from "react";
import Rating from "@material-ui/lab/Rating";
import { useDispatch } from "react-redux";

import { setNewMovieRating } from "../../redux/modules/auth";
import { updateUsersDb } from "../../redux/modules/auth";
import { IMovieRatings } from "../../utils/Interfaces";

const MovieRatings: React.FC<IMovieRatings> = (props) => {
  const dispatch = useDispatch();

  const setNewRating = (e: React.SyntheticEvent<EventTarget>) => {
    if (props.movieid) {
      dispatch(
        setNewMovieRating({
          [props.movieid]: (e.target as HTMLInputElement).value,
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
