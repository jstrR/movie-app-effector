import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    height: 'inherit',
  },
});

export const CircularLoader = ({ size, ...props }: { size?: number }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <CircularProgress size={size || 60} {...props}/>
    </Grid>
  );
};
