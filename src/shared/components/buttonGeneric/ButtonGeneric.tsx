import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const stylesUtils = {
  mainColor: "#2196F3",
  hoverColorBg: "#21CBF3",
  logOutColor: "#DC004E",
  hoverLogOutColorBg: "#FE6B8B",
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props: any) =>
      props.event === "logOut"
        ? stylesUtils.logOutColor
        : stylesUtils.mainColor,
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 36,
    padding: "0 30px",
    "&:hover": {
      backgroundColor: stylesUtils.hoverLogOutColorBg,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0.8rem 0",
      height: 40,
    },
  },
}));

export const ButtonGeneric: React.FC<any> = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <Button
        {...props}
        className={`${props.className} ${classes.root}`}
        variant="contained"
      />
    </>
  );
};

