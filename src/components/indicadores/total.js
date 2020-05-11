import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Title from '../layout/title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    fontSize: '16px',
    lineHeight: '20px',
    marginTop: '8px',
    color:'#FFFFFFred',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    fontSize: '36px',
    lineHeight: '44px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600'
  },
  containerTotal: {
    marginLeft: '10px',
    marginTop: '10px'
  }
});

export default function Total(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
    <div className={classes.containerTotal}>
      <Grid container spacing={2}>
        <Grid item xs = {8}>
          <Typography component="p" variant="h4" className={classes.total}>
            {props.total}
          </Typography>
        </Grid>
        <Grid item xs className={classes.icon}>
          <img src={props.src} alt="devices" />
        </Grid>
      </Grid>
      <Typography color="textSecondary" className={classes.depositContext}>
         {props.leyenda}
      </Typography>
     </div>
    </React.Fragment>
  );
}

// import React from 'react';
// import Link from '@material-ui/core/Link';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Title from './title';

// const useStyles = makeStyles({
//   depositContext: {
//     flex: 1,
//   },
// });

// export default function Total(props) {
//   const classes = useStyles();
//   return (
//     <React.Fragment>
//       <div >
//       {/* <Title>{props.titulo}</Title> */}
//       <Typography component="p" variant="h2">
//          {props.total}
//       </Typography>
//       <Typography color="textSecondary" variant="h5" className={classes.depositContext}>
//          {props.leyenda}
//       </Typography>
//       </div>
//     </React.Fragment>
//   );
// }