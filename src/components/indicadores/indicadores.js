import React, { PureComponent,useEffect ,useState} from 'react';
import { Application } from '../../App';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Total from '../layout/total'
import BarStack from './barstack'
import BarHorizontal from './barhorizontal'
import GeoCalendar from '../heatmap/geocalendar';
import Title from '../layout/title'
import Voronoi from './voronoi.js'
//mport Title from '../dashboard/title';
//import FaroPieChart from '../indicadores/faropiechart';
//import FaroPieChart from './faropiechartborrar';
//import PieChartDE from '../indicadores/piechartde';
//import Total from '../indicadores/total';
//import CircleTotal from '../indicadores/circletotal';

//import TotalCircle from '../indicadores/totalcircle';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
   
  },
    paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  fixedHeight: {
    height: 600,
  },
  
   fixedHeight2: {
    height: 180,
  },
}));
export default function Indicadores() {
  //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  const { state, dispatch } = React.useContext(Application);
  const [totalKPI,setTotaKPI]= useState("33.000");
  const [totalDevices,setTotaDevices]= useState("13");
  const [tota3GBaseStations,setTota3GBaseStations]= useState("130");
  const [tota4GBaseStations,setTota4GBaseStations]= useState("430");
  useEffect(() => {
   // alert("indicadores "+JSON.stringify(state.days))
  }, []);
  function clickDay (newday)  {

  }
// alert("indicadores "+JSON.stringify(DASHBOARD2.dashboard[3].resultados))
    return (
        <div className={classes.root}>    
         
        <Container maxWidth="lg" className={classes.container}>  
      
        <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
           <Total titulo={'Messages'} indicador={'Totalhh'} color={'#1bc943'} bcolor={"rgba(27, 201, 67, 0.15)"} porc={45} total={totalKPI} leyenda={'Total Acumulado'}/>
      </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'Devices'} indicador={'Totalhh'} color={'#1bc943'} bcolor={"rgba(27, 201, 67, 0.15)"} porc={45} total={totalDevices} leyenda={'Dispositivos Activos'}/>
      </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'3G Basestations'}  total={tota3GBaseStations}leyenda={'Dispositivos Activos'}/>
      </Paper>
   
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'4G Basestations'}   total={tota3GBaseStations} leyenda={'Dispositivos Activos'}/>
      </Paper>
   
      </Grid>
      
      </Grid>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6}>
      <Paper className={fixedHeightPaper2}>
      <BarHorizontal titulo={'Mobile Generation'}  />
           

      </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      <Paper className={fixedHeightPaper2}>
      <BarStack titulo={'Sygnal Type'}  />

      </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
      <Paper className={fixedHeightPaper}>
      <Title>{'Actividad'}</Title>
      <Voronoi />
      <GeoCalendar days={state.days} clickday={clickDay} />

      </Paper>
      </Grid>
</Grid>    
   </Container>
</div>
    );
  }