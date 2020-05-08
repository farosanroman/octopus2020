import React,{useEffect,useState} from 'react';
import { Application } from '../../App';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
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
const config = {
  apiKey: 'AIzaSyDZ08hKl01qFilc3nJ4oRmO8wq49pcsw8s',
  authDomain: 'vinotinto-7f56f.firebaseapp.com',
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  //signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //  firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //  firebase.auth.EmailAuthProvider.PROVIDER_ID,
       // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
       // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
};
firebase.initializeApp(config);
//andres@alcancia.biz
//Juanfer123.
//octotestingv2@gmail.com
//Octo123.
export default function Login(prop) {
  const classes = useStyles();
  const [loginauth, setLoginAuth] = useState({uid:"0",name:"",photoURL:"",email:"",phone:"",cedula:"",lat:0,lng:0})

  const [flag, setFlag] = useState(false);
  const [flagAsignacion, setFlagAsignacion] = useState(false);
  const [openSnackBar,setOpenSnackBar]= useState(true);
  const [mensajeSnackBar,setMensajeSnackBar]= useState("");
  const { state, dispatch } = React.useContext(Application);
  useEffect(() => {   
    //alert(user)
    //setOpenSnackBar(true)
    //setMensajeSnackBar("Autenticando en Twitter...(useEffect)")
   //A U T O M A T I C O
    firebase.auth().onAuthStateChanged(
      user=>{
       // alert(JSON.stringify(user))
        //console.log(JSON.stringify(user))
       //setLoginAuth(login)
        SignIn(user)
      }
  
    )
     
},[]);
useEffect(() => {  
  if (loginauth.name!=""){
    ///
    ///  AUDITORIA de la EXISTENCIA
    ///
    ///
  setOpenSnackBar(true)
  setMensajeSnackBar("Autenticando el correo:"+loginauth.email+" de "+loginauth.name)
  }
      dispatch({
        type: 'LOGIN',
        stateprop: loginauth
      });
},[loginauth]);
function SignIn(user) {
     // alert("firebase user "+JSON.stringify(user))
      var login={id:user.providerData[0].uid,name:user.displayName,photoURL:user.photoURL,email:user.email,phone:user.metadata.phoneNumber,cedula:"",photo:"",lat:0,lng:0}
      setLoginAuth(login)
      // alert(JSON.stringify(login))
      //setMensajeSnackBar(user.displayName)
      
    }
    function handleCloseSnackBar() {
      // onClick("V3664204")
       setOpenSnackBar(false)
        prop.loginclick()
     }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        <Avatar alt="Remy Sharp" src={'images/logo.png'} className={classes.bigAvatar} />

        
          <Typography variant="h6" color="inherit" noWrap>
            Señales 2G 3G 4G 5G
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Snackbar
          open={openSnackBar}
          autoHideDuration={5000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
       >
               <SnackbarContent style={{backgroundColor:'#1DA1F2',}}
                     message={<span id="client-snackbar">{mensajeSnackBar}</span>}
                />
        </Snackbar>
        <SignInSide />
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Octopus FullStack 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Proyecto de "SoftWare Abierto" en JavaScript  basado en React, Hooks, Material, Node.js, CosmosDB y MapBox.
            
               </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <StyledFirebaseAuth uiConfig={config} firebaseAuth={firebase.auth()} />
                  <Button  variant="contained" color="primary"  onClick={() => prop.loginclick()}>
                  Conexión
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          <Grid item key={11} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkzxvg5ochEkpFpur8Eo7d57C4ghQyDMhuX5pvKnDFpGxzlEqF"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Antenas
                    </Typography>
                    <Typography>
                      Comunicacion con las Antenas para establecer dialogos y respuestas de intensidad.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item key={12} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://archivosamarillos.blob.core.windows.net/manualesfaro/mapas1.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Calidad
                    </Typography>
                    <Typography>
                      El dispositivo analiza y registra en la plataforma los valores de la calidad de la transmicion.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item key={13} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://archivosamarillos.blob.core.windows.net/manualesfaro/mapas.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      GeoMapas
                    </Typography>
                    <Typography>
                      Atractivo Dashboard de representacion GeoEspacial de las rutas de los Drones.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Detalles de Octopus
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}