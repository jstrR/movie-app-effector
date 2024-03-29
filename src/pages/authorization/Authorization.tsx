import React, { Suspense, lazy } from "react";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import { useStore } from "effector-react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { userModel } from "entities/user";
import { CircularLoader } from "shared/ui";

const SignUpForm = lazy(() => import("features/authentication/signUpForm"));
const LogInForm = lazy(() => import("features/authentication/logInForm"));

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
  const location = useLocation();

  const isAuthenticated = useStore(userModel.$isAuthenticated);

  return (
    <>
      {isAuthenticated && (
        <Routes>
          <Route
            children={() => <Navigate to="/" replace state={{ from: location }} />}
          />
        </Routes>
      )}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Suspense fallback={<CircularLoader />}>
            <Routes>
              <Route path="/*" element={location.pathname === '/signup' ? <SignUpForm /> : <LogInForm />} />
            </Routes>
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default Authorization;
