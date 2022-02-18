import React, { useEffect } from "react";
import { useStore } from "effector-react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { CircularLoader } from "shared/components";
import { movieModel, MovieChartCard } from "entities/movie";
import { MoviesSort } from "features/moviesSort";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(12),
  },
}));

const MovieChartPage = () => {
  const moviesStorage = useStore(movieModel.$moviesStorage);
  const classes = useStyles();

  useEffect(() => {
    movieModel.fetchAllMoviesFx();
  }, []);

  return (
    <main>
      <MoviesSort />
      {moviesStorage.length ? (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={8}>
            {moviesStorage.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <MovieChartCard movieData={card} />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <CircularLoader />
      )}
    </main>
  );
};

export default MovieChartPage;
