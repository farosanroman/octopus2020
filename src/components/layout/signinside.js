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

import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { grey,cyan } from '@material-ui/core/colors';
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
const theme = createMuiTheme({
  palette: {
    primary: {
      light: cyan[500],
      main: cyan[500],
      dark: cyan[500],
      contrastText: "black"
    },
    secondary: {
      light: cyan[500],
      main: cyan[500],
      dark: cyan[500]
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root2: {
  
      margin: theme.spacing(2),
  
  },
  root: {
    height: '100%',
    
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
   flexGrow:1,
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    boxshadow: '2px 2px 5px rgba(0, 0, 0, 0.570422)'

  },
  paper: {
    //margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
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
      <Grid item xs={12} sm={7} md={5}  elevation={6} square >
      <ThemeProvider theme={theme}>
        <div className={classes.paper} >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
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
             <div className={classes.root2}>
            <Button
              type="submit"
            
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={auth}
            >
              Sign In
            </Button>{"  "}
            <Button
              type="submit"
              
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={auth}
            >
              Forgot Password
            </Button>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
        </ThemeProvider>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}