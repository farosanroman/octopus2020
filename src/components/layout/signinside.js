import React from 'react';
import { Application } from '../../App';
//import city2 from "../../images/city2.jpg";
import logo from '../../images/logo.png'
import bg from "../../images/bg.png";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//backgroundImage: 'url(https://source.unsplash.com/random)',
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Octolytics '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '60vh',
    
  },
  color: {
    backgroundColor: 'black'
    },
  image: {
   backgroundImage: `url(${logo})`,
   //backgroundImage: 'url(https://images.unsplash.com/photo-1586732538632-47e539174a1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)',
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    backgroundColor:'#0A232F',
//      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    //backgroundSize: 'cover',
   //width: '100vh',
   //height: '200vh',
   flexGrow:1,
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    boxshadow: '2px 2px 5px rgba(0, 0, 0, 0.570422)'

  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
    const { state, dispatch } = React.useContext(Application);
  const classes = useStyles();
  function auth(){

    dispatch({
        type: 'FLAGLOGIN',
        stateprop: true
      });
  }
  
  return (
    <React.Fragment>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={5} md={7} className={classes.image} align="center" >
      {/* <img src={logo} height="50%" width="50%" align="center"  alt="Logo" /> */}
      </Grid>
      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={auth}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}