import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Total(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.titulo}</Title>
      <Typography component="p" variant="h4">
         {props.total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
         {props.leyenda}
      </Typography>
     
    </React.Fragment>
  );
}