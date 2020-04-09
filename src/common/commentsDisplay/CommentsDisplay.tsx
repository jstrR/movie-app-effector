import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { IComment } from "../../utils/Interfaces";

const getDateDisplayValue = (
  date: Date,
  format = localStorage.getItem("i18nextLng")
) => {
  return date
    ? date.toLocaleString((format = "en-Us"), {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : null;
};

const stylesUtils = {
  borderColor: "#edeff1",
  textMainColor: "#7c7c7c",
};

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    marginBottom: "2rem",
    minHeight: "5rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2rem",
      border: "none",
    },
    "&:first-child": {
      marginTop: "2rem",
    },
  },
  dataWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderBottom: `2px solid ${stylesUtils.borderColor}`,
  },
  data: {
    padding: 8,
    paddingLeft: 16,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  message: {
    color: stylesUtils.textMainColor,
    padding: 16,
    whiteSpace: "pre-wrap",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
    },
  },
}));

interface ICommentsDisplayProps {
  comment?: IComment;
}

const CommentsDisplay: React.FC<ICommentsDisplayProps> = ({ comment }) => {
  const classes = useStyles();

  if (!Object.keys(comment || {}).length) {
    return null;
  }

  return (
    <div>
      <Grid container alignItems="center" className={classes.inputWrapper}>
        <Grid item xs={12} sm={12} md={12} className={classes.dataWrapper}>
          <Typography
            component="span"
            variant="subtitle2"
            className={classes.data}>
            {comment && comment.author}
          </Typography>
          <Typography
            component="span"
            variant="subtitle2"
            className={classes.data}>
            {getDateDisplayValue(new Date((comment && comment.date) || ""))}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography
            component="p"
            variant="subtitle2"
            className={classes.message}>
            {comment && comment.message}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentsDisplay;
