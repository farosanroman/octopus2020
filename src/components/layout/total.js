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
      <div >
      {/* <Title>{props.titulo}</Title> */}
      <Typography component="p" variant="h2">
         {props.total}
      </Typography>
      <Typography color="textSecondary" variant="h5" className={classes.depositContext}>
         {props.leyenda}
      </Typography>
      </div>
    </React.Fragment>
  );
}