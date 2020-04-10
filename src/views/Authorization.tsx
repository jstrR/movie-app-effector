import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation, Redirect, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import SignUpForm from "../components/signUpForm/SignUpForm";
import LogInForm from "../components/logInForm/LogInForm";

interface ILoggedStatusSelector {
  auth: {
    isAuthenticated: boolean;
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    position: "relative",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const Authorization = () => {
  const classes = useStyles();
  let location = useLocation();

  const selectLoggedStatus = (state: ILoggedStatusSelector): boolean => {
    return state.auth.isAuthenticated;
  };

  const loggedStatus: boolean = useSelector(selectLoggedStatus, shallowEqual);

  return (
    <>
      {loggedStatus && (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Switch>
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/login" component={LogInForm} />
          </Switch>
        </Grid>
      </Grid>
    </>
  );
};

export default Authorization;
