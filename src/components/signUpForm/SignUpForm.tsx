import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { logIn } from "../../redux/modules/auth";
import ButtonGeneric from "../../common/buttonGeneric/ButtonGeneric";
import GoogleLogIn from "../../common/googleLogIn/GoogleLogIn";
import Copyright from "../../common/copyright/Copyright";

interface IFormState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  token?: string;
}

interface IField {
  field: string;
  value?: any;
}

const initialState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
  token: "",
};

const reducer = (state: IFormState, { field, value }: IField) => {
  return { ...state, [field]: value };
};

const addNewUserToStorage = (userObj: IFormState): void => {
  let usersDb = JSON.parse(localStorage.getItem("usersDb") || "");
  if (!Array.isArray(usersDb)) usersDb = [];
  if (userObj && userObj.id === 0) {
    userObj.id = usersDb.length + 1;
  }
  usersDb.push(userObj);
  localStorage.setItem("usersDb", JSON.stringify(usersDb));
};

const validateNewUser = (userObj: IFormState): boolean => {
  let usersDb = JSON.parse(localStorage.getItem("usersDb") || "");
  if (Array.isArray(usersDb)) {
    return !usersDb.find((user) => user.email === userObj.email);
  } else return true;
};

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

const SignUpForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  const { t } = useTranslation(["translaitons", "login/signupPage"]);
  let { from }: any = location.state || { from: { pathname: "/" } };

  const [validationError, setValidationError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [state, reactDispatch] = useReducer(reducer, initialState);

  const onChange = (e: React.SyntheticEvent<EventTarget>): void => {
    reactDispatch({
      field: (e.target as HTMLInputElement).name,
      value: (e.target as HTMLInputElement).value,
    });
  };

  const formSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const newUser = { ...state };
    if (newUser.email.split("@")[0] === "admin") {
      newUser.role = "admin";
    } else if (newUser.email.split("@")[0] === "moderator") {
      newUser.role = "moderator";
    } else {
      newUser.role = "user";
    }
    if (validateNewUser(newUser)) {
      addNewUserToStorage(newUser);
      dispatch(logIn(newUser));
      history.push(from);
    } else setValidationError(true);
  };

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("translations:common.signUp")}
        </Typography>
        <form className={classes.form} onSubmit={formSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={t("login/signupPage:firstName")}
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label={t("login/signupPage:lastName")}
                name="lastName"
                autoComplete="lname"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={t("login/signupPage:mailAdress")}
                name="email"
                placeholder="email@example.com"
                type="email"
                autoComplete="email"
                onChange={onChange}
                error={validationError}
                helperText={
                  validationError
                    ? t("login/signupPage:validationError.signup")
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" required fullWidth>
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
              </FormControl>
            </Grid>
          </Grid>
          <Box mb={2}>
            <ButtonGeneric
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}>
              {t("translations:common.signUp")}
            </ButtonGeneric>
            <Box my={2}>
              <Typography variant="body2" color="textSecondary" align="center">
                {t("login/signupPage:or")}
              </Typography>
            </Box>
            <Grid container>
              <GoogleLogIn className={classes.googleBtn}>
                {t("login/signupPage:googleBtn.signup")}
              </GoogleLogIn>
            </Grid>
          </Box>
          <Grid container justify="center">
            <Grid>
              <Link to="/login" className={classes.navLink}>
                {t("login/signupPage:dontHaveAccount.signup")}
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

export default SignUpForm;
