import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ButtonNav } from "shared/components";
import { stylesUtils } from "features/comments/lib";

const useStyles = makeStyles(theme => ({
  inputWrapper: {
    marginTop: "3rem",
    minHeight: "5rem",
    border: `2px solid ${stylesUtils.borderColor}`,
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
      border: "none"
    }
  },
  buttonsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  signWrapper: {
    color: stylesUtils.textMainColor,
    paddingLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      margin: "1rem 0",
      paddingLeft: 0
    }
  }
}));

export const CommentsAuth = () => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Grid container alignItems="center" className={classes.inputWrapper}>
      <Grid item xs={12} sm={6} md={7}>
        <Typography
          component="span"
          variant="subtitle2"
          className={classes.signWrapper}
        >
          {t("comments:authSign")}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={5} className={classes.buttonsWrapper}>
        <ButtonNav to={{ pathname: "/login", state: { from: location } }}>
          {t("common.logIn")}
        </ButtonNav>
        <ButtonNav to={{ pathname: "/signup", state: { from: location } }}>
          {t("common.signUp")}
        </ButtonNav>
      </Grid>
    </Grid>
  );
};
