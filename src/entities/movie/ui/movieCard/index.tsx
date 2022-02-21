import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useStore, useStoreMap } from "effector-react";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { userModel } from "entities/user";
import { movieModel } from "entities/movie";
import { Comments } from "widgets/comments";
import { MovieRatings } from "features/movieRatings";
import { ButtonNav } from "shared/ui";
import { CinemaSessions } from "features/cinemaSessions";
import { getDateDisplayValue, formatCurrency } from "entities/movie/lib";

const stylesUtils = {
  mainColor: "#2196F3",
  lightMainColor: "#21CBF3",
  captionColor: "#878787",
  disabledColor: "#FE6B8B",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(4, 4),
    paddingBottom: theme.spacing(16),
  },
  media: {
    minHeight: "375px",
    paddingTop: "56.25%", // 16:9
  },
  sectionHeading: {
    fontWeight: 900,
  },
  buttonNav: {
    "&$disabled": {
      backgroundColor: stylesUtils.disabledColor,
      color: "white",
    },
  },
  disabled: {},
  buttonBack: {
    height: 0,
    margin: "3rem 4rem 0",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export const MovieCard = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams();
  const { from }: any = location.state || { from: { pathname: "/" } };

  const isAuthenticated = useStore(userModel.$isAuthenticated);
  const activeMovie = useStore(movieModel.$activeMovie);
  const userMovieRating = useStoreMap({ store: userModel.$currentUser, keys: [activeMovie?.id], fn: (user) => user?.movieRatings?.find((movie) => movie?.movieId === activeMovie?.id) });

  useEffect(() => {
    if (id) {
      movieModel.fetchMovieFx(id);
    }
  }, [id]);

  return (
    <main>
      <ButtonNav className={classes.buttonBack} to={from}>
        <ArrowBackIosIcon style={{ color: "#2196F3", fontSize: "2.5rem" }} />
      </ButtonNav>
      <div className={classes.paper}>
        <Container maxWidth="lg" disableGutters>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} md={8}>
              <Typography component="h1" variant="h4">
                {t(`movieContent|title.${activeMovie?.title}`, {
                  nsSeparator: "|",
                })}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={4}
              justifyContent="flex-end"
              alignItems="center">
              <Typography
                component="span"
                variant="h6"
                style={{ color: stylesUtils.mainColor }}>
                {userMovieRating?.rating || activeMovie?.vote_average}
              </Typography>
              <Typography
                component="span"
                variant="h6"
                style={{ color: stylesUtils.captionColor }}>
                /10
              </Typography>

              <Grid container justifyContent="flex-end" alignItems="center">
                <MovieRatings
                  movieId={activeMovie?.id || ''}
                  rating={userMovieRating?.rating || activeMovie?.vote_average || 0}
                  maxrating={10}
                  style={{ fontSize: "2rem" }}
                  disabled={!isAuthenticated}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={10}>
              <Typography
                component="span"
                variant="subtitle1"
                style={{ color: stylesUtils.captionColor }}>
                {t(`movieContent|tagline.${activeMovie?.title}`, {
                  nsSeparator: "|",
                })}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              component="span"
              variant="subtitle2"
              style={{ color: stylesUtils.lightMainColor }}>
              {activeMovie?.genres
                ?.map((genre: string) => t(`movieCommon:genres.${genre}`))
                .join(", ")}
            </Typography>
          </Grid>
          <Grid container spacing={5} style={{ marginTop: "1rem" }}>
            <Grid item xs={12} sm={6} md={5}>
              <Card>
                {activeMovie?.poster_path && (
                  <CardMedia
                    className={classes.media}
                    image={activeMovie.poster_path}
                    title={activeMovie?.title}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <CinemaSessions cinemaSessions={activeMovie?.cinemas} />
              <Typography
                component="div"
                variant="h5"
                className={classes.sectionHeading}>
                {t("movieCommon:description.aboutMovie")}
              </Typography>
              <Typography paragraph>
                {t(
                  `movieContent|overview.${activeMovie?.title}`,
                  { nsSeparator: "|" }
                )}
              </Typography>

              <Grid style={{ marginBottom: "1rem" }}>
                {ReactPlayer.canPlay(activeMovie?.trailerUrl || "") && (
                  <ReactPlayer
                    url={activeMovie?.trailerUrl || ""}
                    controls
                    width="100%"
                  />
                )}
              </Grid>
              <Grid container wrap="wrap" justifyContent="space-between">
                <Grid item>
                  <Typography
                    component="h4"
                    variant="h5"
                    className={classes.sectionHeading}>
                    {t("movieCommon:description.releaseDate")}
                  </Typography>
                  {activeMovie?.release_date && (
                    <Typography paragraph>
                      {getDateDisplayValue(new Date(activeMovie.release_date))}
                    </Typography>
                  )}
                </Grid>

                <Grid item>
                  <Typography
                    component="h4"
                    variant="h5"
                    className={classes.sectionHeading}>
                    {t("movieCommon:description.runtime")}
                  </Typography>
                  <Typography paragraph>
                    {activeMovie?.runtime}&nbsp;
                    {t("translations:common.mins")}
                  </Typography>
                </Grid>

                {activeMovie?.budget ? (
                  <Grid item>
                    <Typography
                      component="h4"
                      variant="h5"
                      className={classes.sectionHeading}>
                      {t("movieCommon:description.budget")}
                    </Typography>
                    <Typography paragraph>
                      {formatCurrency(activeMovie.budget)}
                    </Typography>
                  </Grid>
                ) : null}

                {activeMovie?.revenue ? (
                  <Grid item>
                    <Typography
                      component="h4"
                      variant="h5"
                      className={classes.sectionHeading}>
                      {t("movieCommon:description.revenue")}
                    </Typography>
                    <Typography paragraph>
                      {formatCurrency(activeMovie.revenue)}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
              <Grid container justifyContent="space-between">
                {activeMovie?.price ? (
                  <Typography
                    component="h4"
                    variant="h5"
                    className={classes.sectionHeading}>
                    {formatCurrency(activeMovie.price)}
                  </Typography>
                ) : null}
                <ButtonNav
                  to={`${location.pathname}/seats`}
                  disabled={!isAuthenticated}
                  classes={{
                    root: classes.buttonNav,
                    disabled: classes.disabled,
                  }}>
                  {t("translations:common.buyTicket")}
                </ButtonNav>
              </Grid>
            </Grid>
          </Grid>
          <Comments commentsStack={activeMovie?.comments} />
        </Container>
      </div>
    </main>
  );
};

export default MovieCard;
