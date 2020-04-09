import React from "react";
import Rating from "@material-ui/lab/Rating";
import { useDispatch } from "react-redux";

import { setNewMovieRating } from "../../redux/modules/auth";
import { updateUsersDb } from "../../redux/modules/auth";

interface IMovieRatingsProps {
  movieid?: number;
  rating?: string;
  maxrating: number;
  style?: object;
  disabled?: boolean;
}

const MovieRatings: React.FC<IMovieRatingsProps> = (props) => {
  const dispatch = useDispatch();

  const setNewRating = (e: any) => {
    if (props.movieid) {
      dispatch(setNewMovieRating({ [props.movieid]: e.target.value }));
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
