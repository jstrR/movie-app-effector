import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ButtonNav from "../buttonNav/ButtonNav";
import MovieRatings from "../movieRatings/MovieRatings";
import { IMovieObject } from "../../utils/Interfaces";

const getDateDisplayValue = (
  date: Date,
  format = localStorage.getItem("i18nextLng")
) => {
  return date
    ? date.toLocaleString((format = "en-US"), {
        year: "numeric",
      })
    : null;
};

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    paddingTop: "56.25%", // 16:9
    backgroundSize: "cover",
    minHeight: "175px",
  },
  content: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  title: {
    flexGrow: 2,
  },
  genres: {
    color: "#a3a0a0",
  },
  date: {
    color: "#a3a0a0",
    fontSize: "0.9rem",
  },
  buttonNav: {
    margin: 0,
    "&:hover": {
      backgroundColor: "#21CBF3",
    },
  },
}));

interface IMovieChartCardProps {
  movieData: IMovieObject;
}

const MovieChartCard: React.FC<IMovieChartCardProps> = ({ movieData }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  let location = useLocation();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={movieData.poster_path}
        title={t(`movieContent|title.${movieData.title}`, {
          nsSeparator: "|",
        })}
      />
      <CardContent className={classes.content}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.title}>
          {t(`movieContent|title.${movieData.title}`, {
            nsSeparator: "|",
          })}
        </Typography>
        <Typography gutterBottom className={classes.genres}>
          {movieData &&
            movieData.genres &&
            movieData.genres
              .map((genre: string) => t(`movieCommon:genres.${genre}`))
              .join(", ")}
        </Typography>
        <MovieRatings
          rating={movieData.vote_average}
          maxrating={10}
          disabled
          style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}
        />
        <Typography className={classes.date}>
          {getDateDisplayValue(
            new Date((movieData && movieData.release_date) || "")
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonNav
          className={classes.buttonNav}
          fullWidth
          to={{
            pathname: `/movie/${movieData.id}`,
            state: { from: location },
          }}>
          {t("translations:common.view")}
        </ButtonNav>
      </CardActions>
    </Card>
  );
};

export default MovieChartCard;
