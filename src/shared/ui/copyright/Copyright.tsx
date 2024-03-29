import React from "react";
import Typography from "@material-ui/core/Typography";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © Movie-App ${new Date().getFullYear()}`}
    </Typography>
  );
};
