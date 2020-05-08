import React,{useEffect,useState} from 'react';
import { Application } from '../../App';
import bg from "../../images/bg.png";
//import logo from "./logo_main.png";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Footer from '../layout/footer'
import Avatar from '@material-ui/core/Avatar';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import SignInSide from './signinside'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © Octopus '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent"
  },
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '70vh',
    maxWidth:'60hv'
},
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3];
// SignInInside.propTypes = {
//   classes: PropTypes.object.isRequired,
//   onClose: PropTypes.func,
//   selectedValue: PropTypes.string
// };
// const SignInInsideWrapped = withStyles(styles)(SignInInside);

export default function LoginAntena(prop) {
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [loginauth, setLoginAuth] = useState({uid:"0",name:"",photoURL:"",email:"",phone:"",cedula:"",lat:0,lng:0})

  const [flag, setFlag] = useState(false);
  const [flagAsignacion, setFlagAsignacion] = useState(false);
  const [openSnackBar,setOpenSnackBar]= useState(true);
  const [mensajeSnackBar,setMensajeSnackBar]= useState("");
  const { state, dispatch } = React.useContext(Application);

    function handleCloseSnackBar() {
      // onClick("V3664204")
       setOpenSnackBar(false)
        prop.loginclick()
     }
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
        <Avatar alt="Remy Sharp" src={'images/logo.png'} className={classes.bigAvatar} />

        
          <Typography variant="h6" color="inherit" noWrap>
           Octopus
          </Typography>
        </Toolbar>
      </AppBar> */}
      <div>
          <img src={bg} height="100%" width="100%"  alt="Logo" />
           <Dialog open={true}  aria-labelledby="form-dialog-title"   
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              
              classes={{ paper: classes.dialogPaper }}
              >
            <SignInSide />
        </Dialog>
     
      
      </div>
      {/* Footer */}
     
      {/* End footer */}
    </React.Fragment>
  );
}