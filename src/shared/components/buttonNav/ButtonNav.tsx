import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const stylesUtils = {
  mainColor: "#2196F3",
  hoverColorBg: "#21CBF3",
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: stylesUtils.mainColor,
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 32,
    padding: "0 30px",
    margin: "0 1rem",
    "&:hover": {
      backgroundColor: stylesUtils.hoverColorBg,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0.8rem 0",
      height: 40,
    },
  },
}));

export const ButtonNav: React.FC<any> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Button
        {...props}
        className={`${props.className} ${classes.root}`}
        variant="contained"
        component={Link}
      />
    </>
  );
};
