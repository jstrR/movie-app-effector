import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { userModel } from "entities/user";
import { ButtonGeneric, Copyright } from "shared/ui";
import { GoogleLogIn } from "..";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#2196F3",
  },
  margin: {
    margin: theme.spacing(1, 0),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  navLink: {
    textDecoration: "none",
    color: "#3f51b5",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  copyright: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      top: "90vh",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
    },
  },
  googleBtn: {
    width: "100%",
    justifyContent: "center",
  },
}));

export const LogInForm = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(["translaitons", "login/signupPage"]);
  const { from }: any = useMemo(() => location.state || { from: { pathname: "/" } }, [location.state]);
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isAuthenticated = useStore(userModel.$isAuthenticated);
  const logInError = useStore(userModel.$logInError);

  const onChange = (e: React.SyntheticEvent<EventTarget>): void => {
    setUserData({
      ...userData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const [validationError, setValidationError] = useState(false);

  const formSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    userModel.logIn({ email: userData.email, password: userData.password, token: '' });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [from, isAuthenticated, navigate]);

  useEffect(() => {
    if (logInError) {
      setValidationError(true);
    }
  }, [logInError]);

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("translations:common.logIn")}
        </Typography>
        <form className={classes.form} onSubmit={formSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("login/signupPage:mailAdress")}
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="email@example.com"
            type="email"
            onChange={onChange}
          />
          <FormControl
            variant="outlined"
            required
            fullWidth
            className={classes.margin}
            error={validationError}>
            <InputLabel htmlFor="outlined-adornment-password">
              {t("login/signupPage:password")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={onChange}
              name="password"
              autoComplete="current-password"
              inputProps={{ minLength: 8 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            {validationError && (
              <FormHelperText>
                {t("login/signupPage:validationError.login")}
              </FormHelperText>
            )}
          </FormControl>
          <Box mb={2}>
            <ButtonGeneric
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}>
              {t("translations:common.logIn")}
            </ButtonGeneric>
            <Box my={2}>
              <Typography variant="body2" color="textSecondary" align="center">
                {t("login/signupPage:or")}
              </Typography>
            </Box>
            <Grid container>
              <GoogleLogIn className={classes.googleBtn} onLogin={userModel.logIn}>
                {t("login/signupPage:googleBtn.logIn")}
              </GoogleLogIn>
            </Grid>
          </Box>
          <Grid container justifyContent="center">
            <Grid>
              <Link to="../../signup" className={classes.navLink}>
                {t("login/signupPage:dontHaveAccount.login")}
              </Link>
            </Grid>
          </Grid>
          <Box mt={2} className={classes.copyright}>
            <Copyright />
          </Box>
        </form>
      </div>
    </>
  );
};
