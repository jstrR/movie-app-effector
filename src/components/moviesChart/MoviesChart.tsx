import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import MovieChartCard from "../../common/movieChartCard/MovieChartCard";
import { IMovieObject } from "../../utils/types";

interface IMoviesChartProps {
  moviesStorage: Array<IMovieObject>;
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
}));

const MoviesChart: React.FC<IMoviesChartProps> = ({ moviesStorage }) => {
  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={8}>
        {moviesStorage.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <MovieChartCard movieData={card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default React.memo(MoviesChart);
