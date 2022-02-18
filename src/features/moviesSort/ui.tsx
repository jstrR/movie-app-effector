import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import IconButton from "@material-ui/core/IconButton";

import { movieModel } from "entities/movie";

const useDidMount = (): boolean => {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);
  return didMount;
};

type sortType = "asc" | "desc";

const useStyles = makeStyles({
  item: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
  },
  buttonToggler: {
    color: "#2196F3",
    marginLeft: "0.5rem",
    padding: 0,
    "&:hover": {
      backgroundColor: "rgba(33, 150, 243, 0.11)",
    },
  },
});

export const MoviesSort = () => {
  const classes = useStyles();
  const didMount = useDidMount();
  const { t } = useTranslation();

  const [ratingSortType, setRatingSortType] = useState<sortType>("desc");
  const [dateSortType, setDateSortType] = useState<sortType>("desc");

  useEffect(() => {
    movieModel.sortByRating(ratingSortType);
  }, [ratingSortType]);

  useEffect(() => {
    if (didMount) {
      movieModel.sortByDate(dateSortType);
    }
  }, [dateSortType, didMount]);

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid container item xs={12} sm={6} md={6} className={classes.item}>
          <Typography component="span" variant="h6" style={{ fontWeight: 900 }}>
            {t("movieSorting:rating")}
          </Typography>
          {ratingSortType !== "asc" && (
            <IconButton
              className={classes.buttonToggler}
              onClick={() => setRatingSortType("asc")}>
              <KeyboardArrowDownOutlinedIcon style={{ fontSize: "2.5rem" }} />
            </IconButton>
          )}
          {ratingSortType !== "desc" && (
            <IconButton
              className={classes.buttonToggler}
              onClick={() => setRatingSortType("desc")}>
              <KeyboardArrowUpOutlinedIcon style={{ fontSize: "2.5rem" }} />
            </IconButton>
          )}
        </Grid>
        <Grid container item xs={12} sm={6} md={6} className={classes.item}>
          <Typography component="span" variant="h6">
            {t("movieSorting:date")}
          </Typography>
          {dateSortType !== "asc" && (
            <IconButton
              className={classes.buttonToggler}
              onClick={() => setDateSortType("asc")}>
              <KeyboardArrowDownOutlinedIcon style={{ fontSize: "2.5rem" }} />
            </IconButton>
          )}
          {dateSortType !== "desc" && (
            <IconButton
              className={classes.buttonToggler}
              onClick={() => setDateSortType("desc")}>
              <KeyboardArrowUpOutlinedIcon style={{ fontSize: "2.5rem" }} />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
