import React,{useEffect} from 'react';
import clsx from 'clsx';
import { Application } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';



import TuneIcon from '@material-ui/icons/Tune';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Geo from         '../heatmap/geo';
import GeoFences from         '../heatmap/geofences';
import GeoPostKpi from         '../postkpi/geopostkpi';
import Modelog from     '../antenas/modelog'
import Dispositivos from     './dispositivos'


import { mainListItems, secondaryListItems } from './listitems';
import MainMenu from './mainmenu'
import Indicadores from '../indicadores/indicadores'
import Antenas from '../antenas/antenas'
import {useFetch} from '../hooks/usefetch';
import {kpigeojson} from '../helpers/kpigeojson';
import {antenas} from '../../data/antenas.json';
import {celular} from '../../data/celular.json';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Octopus '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const drawerWidth2 =300;

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
  drawerPaper2: {
    width: drawerWidth2,
  },
  drawerPaper3: {
    width: 200,
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
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Application);
  const [hora,setHora]=React.useState(new Date())
  const [layout, setLayout] = React.useState(100);
  const [open, setOpen] = React.useState(false);
  const [stateF, setStateF] = React.useState({
    top: true,
    left: true,
    bottom: false,
    right: false,
  });
  const [checked, setChecked] = React.useState(false);
  const [checked2GA, setChecked2GA] = React.useState(true);
  const [checked3GA, setChecked3GA] = React.useState(true);
  const [checked4GA, setChecked4GA] = React.useState(true);

  const [value, setValue] = React.useState('female');
  const [dataDays, isLoadingDays, isErrorDays , fetchDataDays] = useFetch("https://octopustestingfunctions.azurewebsites.net/api/GetGroupByDatesKPICaracas?code=F3Rb8pR03YSXi0fPEtprJ6GHQgEO5VLnc3aF6tvv/9pccdpaXSFwhg=="); 
  const [kpi, setKpi] = React.useState({"type":"FeatureCollection","features":[] });
  useEffect(() => {
   dispatch({
      type: 'CANTANTENAS',
      stateprop: antenas.length
    });
    fetchDataDays("https://octopustestingfunctions.azurewebsites.net/api/GetPkiDates?code=7/HMNoq9HlHgEUOUWxqNEhc6GzmBI7xFQvHaFyuoCpGFqSZa8YNNkw==")
  
  // var a=kpigeojson(celular)
  // setKpi(a)
  // dispatch({
  //   type: 'KPI',
  //   stateprop: a
  // });
  // console.log(JSON.stringify(a))
  // alert(JSON.stringify(a.features.length))
  // alert(JSON.stringify(a.features[0]))
  }, []);
  useEffect(() => {
   
    if ((dataDays.length>0)&&(isLoadingDays)){
     // alert(JSON.stringify(dataDays))
    dispatch({
       type: 'DAYS',
       stateprop: dataDays
     });
   }
  }, [dataDays]);
  const handleMenuChange=(id)=> {
   // alert(id)
    //setValue(event.target.value);
  };
  
  const handleChange = event => {
    setValue(event.target.value);
  };
  const toggleCheckedA =option=>event=> {
   // alert(event.target.checked)
    if (option=="2G"){
    setChecked2GA(prev => !prev);
    }
    if (option=="3G"){
      setChecked3GA(prev => !prev);
      }
      if (option=="4G"){
        setChecked4GA(prev => !prev);
        }
   // alert(event.target.value)
   // setChecked2GA(prev => !prev);
  };
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleFiltersOpen = () => {
    setStateF(true);
  };
  function clickDay (day)  {
    //alert(day)
 }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setStateF({ ...stateF, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      // onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
     <Divider />
     <Grid container 
       spacing={2}
       direction="column"
       alignItems="center"
       justify='center'
        
         >
    
           <Grid item >
           </Grid>
           <Grid item >
      <Paper align="center" className={classes.drawerPaper3}>
      <FormLabel component="legend">Analitycs</FormLabel>
      
       <FormGroup>
            {/* Chart */}
             
            <Grid container width="80" spacing={3}>
            <Grid item xs={6} md={6} lg={6}>
               Signal
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
               Base Station
              </Grid>
            <Grid item xs={6} md={6} lg={6}>
      <FormControlLabel
        control={<Switch color="primary" size="normal" checked={checked2GA} onChange={toggleCheckedA("2G")} />}
        
        label="2G"
      />
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
      <FormControlLabel
        control={<Switch size="normal" checked={checked} onChange={toggleChecked} />}
        
        label="2G"
      />
   </Grid>
   <Grid item xs={6} md={6} lg={6}>
      <FormControlLabel
        control={<Switch  color="primary"size="normal" checked={checked3GA} onChange={toggleCheckedA("3G")} />}
       
        label="3G"
      />
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
      <FormControlLabel
        control={<Switch size="normal" checked={checked} onChange={toggleChecked} />}
        label="3G"
      />
   </Grid>
   <Grid item xs={6} md={6} lg={6}>
      <FormControlLabel
        control={<Switch  color="primary" size="normal" checked={checked4GA} onChange={toggleCheckedA("4G")} />}
       
        label="4G"
      />
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
      <FormControlLabel
        control={<Switch size="normal" checked={checked} onChange={toggleChecked} />}
        label="4G"
      />
   </Grid>
   </Grid>
    </FormGroup>
    </Paper>
    </Grid>
           <Grid item >
     <Paper align="center" className={classes.drawerPaper3}>
     <FormControl component="fieldset">
      <FormLabel component="legend">Analitycs</FormLabel>
      <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
      <FormControlLabel
          value="end"
          control={<Radio color="primary" />}
          label="Signal Strengh"
          labelPlacement="end"
        />
      </RadioGroup>
      <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
      <FormControlLabel
          value="end"
          control={<Radio color="primary" />}
          label="Signal Quality"
          labelPlacement="end"
        />
      </RadioGroup>
      <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
      <FormControlLabel
          value="end"
          control={<Radio color="primary" />}
          label="Battery Lavel"
          labelPlacement="end"
        />
      </RadioGroup>
      <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
      <FormControlLabel
          value="end"
          control={<Radio color="primary" />}
          label="RSSI"
          labelPlacement="end"
        />
       <FormControlLabel
          value="end"
          control={<Radio color="primary" />}
          label="SNR"
          labelPlacement="end"
        />
        <FormControlLabel
          value="end"
          control={<Radio color="primary" />}
          label="CQI"
          labelPlacement="end"
        />
      </RadioGroup>

    </FormControl>
       </Paper>
       </Grid></Grid>
    </div>
  );

  useEffect(() => {
    //alert(layout)
      },[layout]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
         
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard de Analisis 
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('right', true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <TuneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
      <List>                     
        <MainMenu handleLayout={setLayout}/>
    </List>
        
        <Divider />
       
        <List>{secondaryListItems}</List>
      </Drawer>
      <Drawer anchor="right" open={stateF.right} onClose={toggleDrawer('right', false)}
      classes={{
        paper: classes.drawerPaper2,
      }}
      >
        {sideList('right')}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        
        {(layout==100)&&     
      <div className={classes.root}>
           <Container maxWidth="lg" className={classes.container}>
    <Indicadores />
    </Container>
  </div>
}
        {(layout==0)&&
        <Container maxWidth="lg" className={classes.container}>
         
          
                 <Geo filtro2GA={checked2GA} filtro3GA={checked3GA} filtro4GA={checked4GA} />
            {/* <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
               <GeoBar />
              </Paper>
            </Grid>
           
            <Grid item xs={12} md={6} lg={6}>
               <Paper className={fixedHeightPaper}>
                 <GeoPie />   
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
               <Paper className={fixedHeightPaper}>
               <Chart1 />   
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
               <Paper className={fixedHeightPaper}>
                 <ChartDayPki />   
              </Paper>
            </Grid> */}
          
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
}
{(layout==1)&&     
      <div className={classes.root}>
           
    <Grid container spacing={4} justify="center">
      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.paper2}><Modelog /></Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
         <Paper className={classes.paper2}><Modelog /></Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
         <Paper className={classes.paper2}><Antenas /></Paper>
      </Grid>
      
    </Grid>
  </div>
}
{(layout==2)&&
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                 <GeoFences />
              </Paper>
            </Grid>
           
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
}
{(layout==3)&&     
      <div className={classes.root}>
    
    <Grid container spacing={4} justify="center">
      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.paper2}><Dispositivos /></Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
         <Paper className={classes.paper2}><Dispositivos /></Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.paper2}><Dispositivos /></Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
         <Paper className={classes.paper2}><Dispositivos /></Paper>
      </Grid>
 

    </Grid>
  </div>
}
{(layout==4)&&     
     <GeoPostKpi />
 
}
      </main>
    </div>
  );
}
