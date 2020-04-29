import React, { PureComponent,useEffect ,useState,useContext} from 'react';
import KpiContext from '../../context/kpiContext'
import {ADD_KPI} from '../../context/types'

import {useFetch} from '../hooks/usefetch'; 
import { Application } from '../../App';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from '../layout/title'
import Total from '../layout/total'
import BarStack from './barstack'
import BarHorizontal from './barhorizontal'
import GeoCalendar from '../heatmap/geocalendar';
import CircularProgress from '@material-ui/core/CircularProgress'; 

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
  root0: {
    display: 'flex',
  },
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
    background: '#081C25',
  },
    paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },
  fixedHeight: {
    height: 600,
  },
  
   fixedHeight2: {
    height: 180,
  },
  fixedHeight3: {
    height: 220,
  },
}));
export default function Indicadores() {
  //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  const fixedHeightPaper3 = clsx(classes.paper, classes.fixedHeight3);
  
  const { state, dispatch } = React.useContext(Application);
  
  const contextKPI = useContext(KpiContext);
  const [data, isLoading, isError , fetchData] = useFetch(""); 

  const [totalKPI,setTotaKPI]= useState("33.000");
  const [totalDevices,setTotaDevices]= useState("13");
  const [tota3GBaseStations,setTota3GBaseStations]= useState("10");
  const [tota4GBaseStations,setTota4GBaseStations]= useState("430");
  
  const [flagCircular, setFlagCircular] = React.useState(false);     

  useEffect(() => {
    // alert(JSON.stringify(contextKPI))
    // contextKPI.addKPI({
    //   firstName: 'ssssssssswww',
    //   lastName: '2222222222222222'
    // });
    // alert(JSON.stringify(contextKPI))
    // alert("indicadores "+JSON.stringify(context))
    //var a=kpigeojson(celular)
  // console.log(JSON.stringify(kpigeojson('GEOJSON')))
  // handleKPIDay(kpigeojson('GEOJSON'))
  fetchData('https://octopustestingfunctions.azurewebsites.net/api/GetKPIDay?code=ophd6G5J32nZT0jZHMoDXr7FEHoRMiQFa876XZ35TpWkmjIBJziHZw==&id=2020-03-28');
     
 },[]);
 useEffect(() => {
  //alert("in "+option)
 //alert(JSON.stringify(data))
  if (isLoading) {
    setFlagCircular(true)
  }
  //alert(data[0].type)
  if ((data!=undefined)&&(!isLoading))      
  {
   // console.log("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111")
   // console.log(JSON.stringify(data))
   //alert("fetch"+JSON.stringify(data))
   
  //handleKPIDay(data)
  //alert("[] "+JSON.stringify(data))
  if (JSON.stringify(data)=="[]"){
  //  alert()
    contextKPI.dispatchKPI({type:"ADD_KPI",payload:{"type":"FeatureCollection","features":[] }});
    
  }else{
      contextKPI.dispatchKPI({type:"ADD_KPI",payload:data});
  }
   setFlagCircular(false)
   
  }
},[data,isLoading]);

  function clickDay (newday)  {

  }
// alert("indicadores "+JSON.stringify(DASHBOARD2.dashboard[3].resultados))
    return (
        <div className={classes.root}>    
         
        <Container maxWidth="lg" className={classes.container}>  
        {flagCircular&&<CircularProgress variant="indeterminate"   disableShrink  size={17}   thickness={4} className={classes.progress} />}
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'Devices'} indicador={'Totalhh'} color={'#1bc943'} bcolor={"rgba(27, 201, 67, 0.15)"} porc={45} total={totalDevices} leyenda={'Register Devices'}/>
      </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2} elevation={3}>
           <Total titulo={'Devices Reports'} indicador={'Totalhh'} color={'#1bc943'} bcolor={"rgba(27, 201, 67, 0.15)"} porc={45} total={totalKPI} leyenda={'Devices Reports'}/>
      </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'3G Basestations'}  total={tota3GBaseStations}leyenda={'Registered Users'}/>
      </Paper>
   
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'4G Basestations'}   total={tota3GBaseStations} leyenda={'Data Collected'}/>
      </Paper>
   
      </Grid>
      
      </Grid>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6}>
      <Paper className={fixedHeightPaper3}>
      <BarHorizontal titulo={'Mobile Generation'}  />
           

      </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      <Paper className={fixedHeightPaper3}>
      <BarStack titulo={'Sygnal Type'}  />

      </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
      <Paper className={fixedHeightPaper}>
      <Title>{'Actividad'}</Title>
      <Voronoi />
      {/* <GeoCalendar days={state.days} clickday={clickDay} /> */}

      </Paper>
      </Grid>
</Grid>    
   </Container>
</div>
    );
  }