import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { addComment } from "../../redux/modules/movie";
import ButtonGeneric from "../../common/buttonGeneric/ButtonGeneric";
import { IUserObj } from "../../utils/Interfaces";

const stylesUtils = {
  mainColor: "#2196F3",
  hoverButtonColor: "#21CBF3",
};

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    marginTop: "3rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },
  form: {
    width: "100%",
  },
  textField: {
    marginBottom: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
  submit: {
    "&:hover": {
      backgroundColor: stylesUtils.hoverButtonColor,
    },
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: stylesUtils.mainColor,
    },
  },
  cssFocused: {},
  notchedOutline: {},
}));

interface ICurrentUserSelector {
  auth: {
    currentUser?: IUserObj;
  };
}

const CommentsInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let { id } = useParams();

  const [inputValue, setInputValue] = useState("");

  const selectCurrentUser = (state: ICurrentUserSelector) => {
    return state.auth.currentUser;
  };

  const currentUser = useSelector(selectCurrentUser, shallowEqual);

  const formSubmit = (e: any) => {
    e.preventDefault();
    const comment = {
      movieId: id,
      author: currentUser && currentUser.email,
      message: inputValue,
      date: new Date(),
    };
    dispatch(addComment(comment));
    setInputValue("");
  };

  return (
    <Grid container alignItems="center" className={classes.inputWrapper}>
      <form className={classes.form} onSubmit={formSubmit}>
        <TextField
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
          label={currentUser && currentUser.email}
          className={classes.textField}
          placeholder={t("comments:typeComment")}
          multiline
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ButtonGeneric className={classes.submit} type="submit">
          {t("comments:postComment")}
        </ButtonGeneric>
      </form>
    </Grid>
  );
};

export default CommentsInput;
