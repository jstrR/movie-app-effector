import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { ButtonGeneric } from "shared/ui";
import { Comment } from "shared/api";
import { movieModel } from "entities/movie";
import { userModel } from "entities/user";
import { stylesUtils } from "features/comments/lib";

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

export const CommentsInput = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  let { id } = useParams();

  const [inputValue, setInputValue] = useState<string>("");

  const currentUser = useStore(userModel.$currentUser);

  const formSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const comment: Comment = {
      movieId: id || '',
      author: currentUser?.email || '',
      message: inputValue,
      date: new Date(),
    };
    movieModel.addComment(comment);
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
          label={currentUser?.email}
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
