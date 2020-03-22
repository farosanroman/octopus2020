  
import React, {useEffect, useState,Fragment } from 'react';
import { Application } from '../../App';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DatePicker from './datepicker';
import GeoCalendar from './geocalendar';
import GeoSlider from './geoslider';
import BarStack2 from './barstack2';
import Histogram from './histogram';

import Dispositivos from './geodispositivos';
import 'date-fns';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

//import { Application } from '../../App';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Switch from '@material-ui/core/Switch';
import  MapGL,{Layer,Feature,ZoomControl,GeoJSONLayer,ScaleControl} from 'react-mapbox-gl';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import RefreshIcon from '@material-ui/icons/Refresh';
//import Chart from 'react-google-charts';
//import GaugeChart from 'react-gauge-chart'
//import { greatCircle, point,circle } from '@turf/turf';

import {useFetch} from '../hooks/usefetch';
//import {useGeolocation} from '../hooks/usegeolocation';


//import {GeoAntenas} from '../helpers/geoantenas'
import {kpigeojson} from '../helpers/kpigeojson';
import {GeoKpi} from '../hooks/geokpi'
import {useKpi} from '../hooks/usekpi'
import {useKpiGeoJson} from '../hooks/usekpigeojson'
import {useKpiGeoJson2} from '../hooks/usekpigeojson2'
//import {antenacercana} from '../helpers/antenacercana'

import {antenas} from '../../data/antenas.json';
//import {celular} from '../../data/celular.json';
//import {aG2} from '../../data/aG2.json';
//import {aG3} from '../../data/aG3.json';
//import {aG4} from '../../data/aG4.json';
//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
//https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
//https://www.npmjs.com/package/react-mapbox-gl-draw     DRAW in MAPBOX!!!!!!!!!!!<<<<<<<<<
//import {PKI} from '../../data/PKI.json';
//import {CIUDADESGEO} from '../../data/ciudadesgeo.json';
//https://onlineimagetools.com/resize-image
//https://onlinepngtools.com/change-png-color
//https://onlinepngtools.com/convert-png-to-base64
let image = new Image();
//image.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAf0lEQVQ4T7WU2w6AMAhD1///aAwmmIpc1LC9DcZJaWBYQwdDnLUXJCJSKQXwEHALdAAPZ+AJ+gqIgKggvoXyrVdkxVlRlNfY5ZEW6v1tm/bWGLNms3msqPLI58KBtDbZP/amnaNMGccjiObLFfHGZ5AWFLWWrc7epf3ztYwpOgA+z1APPYYsnQAAAABJRU5ErkJggg=="
image.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAr0lEQVQ4T92VQRKAMAgD9ef8XIeOOBBD6FmPLSyBAp7H8JnZlU3M7FQu9LKD7MA/wHDKSnbPXHkBZkdUg2l6QBboBTJYVy9lW4AYtVPJ7CI4BXbpeNqoLmwLcDIi9bsyKPsvhX6g0lDAx389kDO2gPiaSkABotqoiwJmm1chA3WtMdVbtk3UbpqUKEGZFBZ5ArL2akcPNszaODg5cvTUSmKOnb3cbSrlnwOn30S+vwH7HygkEWrDEQAAAABJRU5ErkJggg=="
image.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAA50lEQVRIS+1WQRKEMAhbf87Pd6fO4tA2CfHkRU9OBRICFI+P+UTEdzWNiMNxl0YoMAuqAClIBVABHDsIko41eCcX8smsN5DV2JEsyTCgCYQBOHIpoA2EGSu5ELlK7AKphuh96MtqNM6Z//CbQGoWnc5/0HN2mF+ebyCKEZoRpcAE0knlFp7FOTNx2FQ7VB9Vl1tyoel2CD4DkrKoTnM6amQIuyud2fWgLkNrTlQG2bodCMp+GkY0XGBJXYuLtTVSAd7CXYC1hSuZWgt61at16iwo5G/taKcmitwLMu2W7rfollxdMPb9B4dUcCmj6fDXAAAAAElFTkSuQmCC"
const images= ['londonCycle', image];
var linearoja={"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-66,9],[-80.31606674194336,25.77392392167507]]}}]}
const style={   Paper:{padding:1,marginTop:1,marginBottom:1}}
const TOKEN="pk.eyJ1IjoiZmFyb21hcGJveCIsImEiOiJjamt6amF4c3MwdXJ3M3JxdDRpYm9ha2pzIn0.V8cqmZH6dFIcxtKoaWcZZw"
  const Map = MapGL({accessToken: TOKEN });
  const mapStyle = {  flex: 1,  height: "75vh",width: "100%"};
  
  
  const useStyles = makeStyles(theme => ({

    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    fixedHeight: {
      height: 200,
    },
  }));

  export default function Geo() {
  
//   alert(JSON.stringify(antfl))
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const { state, dispatch } = React.useContext(Application);
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState([-66.8726,10.4713]);

    const [flagCircular, setFlagCircular] = React.useState(false);     

    //const [state, dispatch] = React.useReducer(reducer, defaultState);
    //const { state, dispatch } = React.useContext(Application);

    //const [zoom, setZoom] = useState([state.zoom]);
    //const { latitude, longitude, timestamp, accuracy, error } = usePosition();
    //const stategeo = useGeolocation();
   
    const[fecha, setFecha]=useState(new Date())
    //const[criterio0,kpicant0,kpi2G0,kpi3G0,kpi4G0, handleKpiFiltro0,handleKpiDay0]=useKpi(celular)
   //const[criterio,kpicant,kpiRuta,kpi2G,kpi3G,kpi4G,handleKpiDay,handleKpiCriterio]=useKpiGeoJson({"type":"FeatureCollection","features":[]})
   
   const[KPIcriterio,KPIcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson2([])
    
    const[dummy,setDummy]=useState({"G2G":"dummy"})
    
    const[checked2G,setchecked2G]=useState(true)
    const[checked3G,setchecked3G]=useState(true)
    const[checked4G,setchecked4G]=useState(true)
    
    //const[criterio,setCriterio]=useState({"G2G":true,"G3G":true,"G4G":true})
    const[red,setRed]=useState()
    const[orange,setOrange]=useState()
    const[yellow,setYellow]=useState()
    const[green,setGreen]=useState()
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const[dia, setDia]=useState('DIA')
    const [data, isLoading, isError , fetchData] = useFetch(""); 

console.log("GEO")
    const handleDateChange = date => {
      setSelectedDate(date);
    };

useEffect(() => {
   //var a=kpigeojson(celular)
 // console.log(JSON.stringify(kpigeojson('GEOJSON')))
 // handleKPIDay(kpigeojson('GEOJSON'))
 //fetchData('https://octopustestingfunctions.azurewebsites.net/api/GetKPIDay?code=ophd6G5J32nZT0jZHMoDXr7FEHoRMiQFa876XZ35TpWkmjIBJziHZw==&id='+newday);
    
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
  // alert("fetch"+JSON.stringify(data))
   
  handleKPIDay(data)
   setFlagCircular(false)
   
  }
},[data,isLoading]);
// useEffect(() => {
//   setFlagCircular(true)
//  alert("get otro :"+dia)
//  handleKPIFiltroDay(dia)
//   //var d='2020-03-01'
// //setDia('2020-03-01')

//   /////// fetchData('https://octopustestingfunctions.azurewebsites.net/api/GetKPIDay?code=ophd6G5J32nZT0jZHMoDXr7FEHoRMiQFa876XZ35TpWkmjIBJziHZw==&id='+dia);
   
//   // handleKpiDay(state.kpiday)
//  // alert(JSON.stringify(state.kpiday))
//  //console.log(JSON.stringify(state.kpiday))
// },[dia]);
  //  },[state.kpiday]);
useEffect(() => {
  //handleKpiFiltro({"G2G":true,"G3G":true,"G4G":true})
  //alert(JSON.stringify({"G2G":checked2G,"G3G":checked3G,"G4G":checked4G}))
  handleKPICriterio({"G2G":checked2G,"G3G":checked3G,"G4G":checked4G})

//  setCriterio({"G2G":true,"G3G":true,"G4G":true})
//alert("[]")
},[checked2G,checked3G,checked4G]);

   const handleSwitchChange = name => event => {
//var ff=criterio;
    if (name=="G2G"){
      setchecked2G(event.target.checked)
  }
    if (name=="G3G"){
      setchecked3G(event.target.checked)
}
    if (name=="G4G"){
      setchecked4G(event.target.checked)
  }
 
  };

  function clickDay (newday)  {
    //alert("clickDay "+newday)
    //var newfecha=newday.split("-")
    //newday=newfecha[1]+"/"+newfecha[2]*1+"/"+newfecha[0]
    ///alert(newday)
    //handleKPIFiltroDay(newday)
    fetchData('https://octopustestingfunctions.azurewebsites.net/api/GetKPIDay?code=ophd6G5J32nZT0jZHMoDXr7FEHoRMiQFa876XZ35TpWkmjIBJziHZw==&id='+newday);
    
    //handleKPIDay(newday)
    ///setDia(newday)
    //  dispatch({
    //    type: 'KPIDAY',
    //    stateprop: newday
    //  });
  }
  function buttondiaclick ()  {
    // alert(state.kpifechas.length+" "+JSON.stringify(state.kpifechas))
     //var random=Math.floor(Math.random() * 50)*1; 
     //alert("ranmodm"+random)
     //alert(JSON.stringify(state.kpifechas[random]))
     
     //var newday=state.kpifechas[random].day
    // alert("new dia"+newday)
   // setDia(newday)
  //   dispatch({
  //     type: 'KPIDAY',
  //     stateprop: newday
  //   });
    //handlePkiChange({"G2G":true,"G3G":true,"G4G":true})
   }
   function buttonclick ()  {
    setchecked2G(true)
    setchecked3G(true)
    setchecked4G(true)
    //handlePkiChange({"G2G":true,"G3G":true,"G4G":true})
  }
  function onResize (map, event)  {
    //cuando  cambia el tamanno del explorador//
    //alert("onRezise "+map.getZoom()+" " +JSON.stringify(event))
  }
  function onZoomEnd (map, event)  {
    var zoomint=Math.round(map.getZoom());
 
  setZoom(zoomint)
  }
   function onZoom (map, event)  {
    
     var zoomint=Math.round(map.getZoom());
    }
      function onControlClick(map,event){
        var zoomint=Math.round(map.getZoom());
             
          setZoom(zoomint+(event)*1.1)

      }
    // console.log(props.positions.length+" possssssssssss ")
   // setCenter([stategeo.longitude,stategeo.latitude])
  
const SOURCES=antenas.map((nodo,index)=>{  
  //sources proveedores de enlaces   
  
   return(
     <Feature              
          key={index} 
          coordinates={[nodo.lon,nodo.lat]}             
          //onClick={this.markerClick.bind(this, {properties:nodo.properties,coordinates:nodo.geometry.coordinates})}
  />    
       )     
 })

return (
<Fragment>
    <div className={classes.root}>
   
    <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              
              <Paper className={fixedHeightPaper}>
               <GeoCalendar days={state.days} clickday={clickDay} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              
              <Paper className={fixedHeightPaper}>
              <Dispositivos titulo={'Actividad de Dispositivos'}  />
               </Paper>
            </Grid>


            <Grid item xs={12} md={6} lg={6}>
              
              <Paper className={fixedHeightPaper}>
              <BarStack2 titulo={'Sygnal Type'}  />
               </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              
              <Paper className={fixedHeightPaper}>
              <Histogram titulo={'Histogram RSRP'}  />
               </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
            <Paper >

{flagCircular&&<CircularProgress variant="indeterminate"   disableShrink  size={17}   thickness={4} className={classes.progress} />}
    {/* <Button  variant="contained" color="primary"  startIcon={<RefreshIcon />} onClick={() => buttondiaclick()}>      
    {dia}({kpicant})          
                  </Button> */}
    <FormControlLabel
        control={<Switch
          checked={checked2G}
          onChange={handleSwitchChange('G2G')}
          //value="checkedB"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="2G"
      />
       <FormControlLabel
        control={<Switch
          checked={checked3G}
          onChange={handleSwitchChange('G3G')}
          //value="checkedB"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="3G"
      />
       <FormControlLabel
        control={<Switch
          checked={checked4G}
          onChange={handleSwitchChange('G4G')}
          //value="checkedB"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="4G"
      />
      <Divider />
      <GeoSlider />
    {/* <Button  variant="contained" color="primary"  onClick={() => buttonclick()}>
                   Refrescar
                  </Button> */}
{/* <DatePicker clickday={clickDay}/> */}
</Paper>
</Grid>
</Grid>
{/* //https://res.cloudinary.com/dzc4dgpyi/image/upload/v1560300064/Torrecitas-02.png */}
<Map       
   //style="mapbox://styles/mapbox/streets-v8"
   style="mapbox://styles/mapbox/dark-v9"
   // style="mapbox://styles/mapbox/light-v9"
   center={center} 
   //center={[longitude,latitude]} 
   zoom={[zoom]}
   //center={[state.position.longitude,state.position.latitude]} 
   //center={[state.position.latitude,state.position.longitude]} 
   // zoom={[zoom]}
   onZoom={onZoom}
   onZoomEnd={onZoomEnd}
   onResize={onResize}
   containerStyle={mapStyle}        
  
  //onControlClick={onControlClick}
//onClick={this._onClickMap}  
//<ZoomControl onControlClick={onControlClick}/>

> 

<ZoomControl  position={"bottomRight"}/>
<ScaleControl />
<Layer type="symbol" id="marker34" layout={{ 'icon-image': 'londonCycle' }} images={images}>
            {SOURCES}
      </Layer>
     
      <GeoJSONLayer   centro y brillo
          data={KPI2G}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'red','circle-radius': 4,'circle-opacity': 1,'circle-stroke-color': 'Lime' , 'circle-stroke-width': 2,'circle-blur': 0.9, }}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'black'
          }}
          />
   <GeoJSONLayer   centro y brillo
          data={KPI3G}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'red','circle-radius': 4,'circle-opacity': 1,'circle-stroke-color': 'Orange' , 'circle-stroke-width': 2,'circle-blur': 0.9, }}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'black'
          }}
          />
           <GeoJSONLayer   centro y brillo
          data={KPI4G}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'red','circle-radius': 4,'circle-opacity': 1,'circle-stroke-color': 'Red' , 'circle-stroke-width': 2,'circle-blur': 0.9, }}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'black'
          }}
          />
      <GeoJSONLayer
          data={KPIRuta}
          circlePaint={{'circle-color': 'lightgrey','circle-radius': 2,'circle-opacity': .8}}   
          linePaint={{
            'line-color': 'lightgrey',
            'line-width': .4,
           'line-opacity': 0.3
          }}
          
        />
        {/*
   <GeoJSONLayer
          data={kpi2G0}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': '#3BB9FF','circle-radius': 4}}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'dodgerblue'
          }}
          />

<GeoJSONLayer
          data={kpi3G0}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'white','circle-radius': 9,'circle-opacity': 1,'circle-stroke-color': 'gray' , 'circle-stroke-width': 4,'circle-blur': 0.9, }}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'black'
          }}
          />
      <GeoJSONLayer
          data={kpi3G0}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': '#B041FF','circle-radius': 4}}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'purple'
          }}
          />
       <GeoJSONLayer
          data={kpi4G0}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'white','circle-radius': 9,'circle-opacity': 1,'circle-stroke-color': 'gray' , 'circle-stroke-width': 4,'circle-blur': 0.9, }}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'black'
          }}
          />
      <GeoJSONLayer
          data={kpi4G0}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'crimson','circle-radius': 4}}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'red'
          }}
          />
   


      <GeoJSONLayer
          data={kpi2G}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': '#3BB9FF','circle-radius': 4}}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'dodgerblue'
          }}
          />

<GeoJSONLayer
          data={kpi3G}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'white','circle-radius': 9,'circle-opacity': 1,'circle-stroke-color': 'gray' , 'circle-stroke-width': 4,'circle-blur': 0.9, }}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'black'
          }}
          />
      <GeoJSONLayer
          data={kpi3G}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': '#B041FF','circle-radius': 4}}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'purple'
          }}
          />
       <GeoJSONLayer
          data={kpi4G}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'white','circle-radius': 9,'circle-opacity': 1,'circle-stroke-color': 'gray' , 'circle-stroke-width': 4,'circle-blur': 0.9, }}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'black'
          }}
          />
      <GeoJSONLayer
          data={kpi4G}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'crimson','circle-radius': 4}}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'red'
          }}
          />
         */}

<GeoJSONLayer
          data={tres}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'white','circle-radius': 16,'circle-opacity': 0.5,'circle-stroke-color': 'white' , 'circle-stroke-width': 2,'circle-blur': 0.9,}}         
         
          />
 <GeoJSONLayer
          data={tres}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'white','circle-radius': 6,'circle-blur': 0.9 }}         
          symbolLayout={{
            'text-field': '{nombre0}',
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
            
          }}
          symbolPaint={{
            'text-color': 'black'
          }}
          />
         
</Map>


        </div>


</Fragment>
)
function Card (props){
  return (
    <div>div</div>
  )
}

  }

  var tres=
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
            "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
            "timestamp": "2020-02-29T14:21:28.311Z",
            "mobilegeneration": "3G",
            "cellid": 100301,
            "cidreported": 2567681,
            "downlink": 1.4,
            "rtt": 350,
            "mcc": 734,
            "mnc": 2,
            "lac": 700,
            "loc": 1,
            "lon": -66.85489415,
            "lat": 10.46507604,
            "signaltype": "LTE",
            "signalstrength": 27,
            "rsrq": -11,
            "rsrp": -89,
            "bhealth": "GOOD",
            "blevel": 1,
            "bsource": "AC",
            "bstatus": "FULL",
            "btemp": 242,
            "bvolts": 4346,
            "bslon": "NULL",
            "bslat": "NULL",
            "status": "NULL"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                -66.871643,
                10.453198250000001
            ]
        }
      },
      {
        "type": "Feature",
        "properties": {
            "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
            "timestamp": "2020-02-29T14:21:28.311Z",
            "mobilegeneration": "3G",
            "cellid": 100301,
            "cidreported": 2567681,
            "downlink": 1.4,
            "rtt": 350,
            "mcc": 734,
            "mnc": 2,
            "lac": 700,
            "loc": 1,
            "lon": -66.85489415,
            "lat": 10.46507604,
            "signaltype": "LTE",
            "signalstrength": 27,
            "rsrq": -11,
            "rsrp": -89,
            "bhealth": "GOOD",
            "blevel": 1,
            "bsource": "AC",
            "bstatus": "FULL",
            "btemp": 242,
            "bvolts": 4346,
            "bslon": "NULL",
            "bslat": "NULL",
            "status": "NULL"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                -66.873643,
                10.453198250000001
            ]
        }
      }
    ]
  }
 var antena=
 {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -66.894276,
      10.504417
    ]
  },
  "properties": {
    "clientid": "9c1fc612-b92c-4701-ab78-edc89b3e4108",
    "geoboundaryid": "459ff828-0b6d-4149-80d5-9e0392dd8559",
    "cellid": "160021",
    "mobilegeneration": "4G",
    "technology": "LTE",
    "lon": "-66.894276",
    "lat": "10.504417",
    "aperture": "65",
    "band": "",
    "bcc": "",
    "bcch": "",
    "bsc": "",
    "bts": "",
    "btssector": "",
    "direction": "",
    "enodeb": "L_AV_ANDRES_BELLO",
    "enodebid": "16002",
    "lac": "",
    "ncc": "",
    "mme": "MMEVAL01",
    "orientation": "55",
    "pci": "229",
    "rac": "",
    "region": "GRAN CARACAS",
    "rnc": "",
    "scramblecode": "",
    "sectorname": "L_AV_ANDRES_BELLO1",
    "siteid": "16002",
    "tac": "15011",
    "wbts": "",
    "wcel": "",
    "cidreported": "",
    "id": "ab1bf710-b15c-11e8-85b2-000d3a974c26"
  }
}
var device=
{
  "deviceId": "07F1A8206765346D6110F9A5C13E5A3A340DA011DDD986F97302A999D6A3CB52",
  "serverPublicKey": "AAAAAAAAAAAAAAAAAAAAAMBGLKA2fVWLoP90ZeKpPAOeEH_ZSfrq78qG3hfA0HzOVgced8QEmz-dglxEjNYgD4MXMxsHGCbC1T3jqQ",
  "serverPrivateKey": "AAAAAAAAAAAAAAAAAAAAABv3uHa2jWCZI8abVEzmOJrmk1BbYFtiamJNCTUq-7wLv930WZ5VvwQY0x6EtpRLEcGahBm4bHkT65BmgA",
  "publicKey": "AAAAAAAAAAAAAAAAAAAAAEmfkY8kglquaWTnuAwp2_Vv0thAKtO-xZB_tM16DZnDBLzCwiQGxTK40UvrirvQSrkxq7JnI3vOoeNY",
  "deviceTwinData": {
    "board": "ysl",
    "brand": "xiaomi",
    "carrierId": "9c1fc612-b92c-4701-ab78-edc89b3e4108",
    "country": "Estados Unidos",
    "cpuSupportedAbis": "armeabi-v7a,armeabi",
    "device": "ysl",
    "deviceId": "07F1A8206765346D6110F9A5C13E5A3A340DA011DDD986F97302A999D6A3CB52",
    "deviceType": "Xiaomi-Redmi S2",
    "hardware": "qcom",
    "manufacturer": "Xiaomi",
    "mcc": "734",
    "mnc": "4",
    "mobileEquipmentId": "868714032146034",
    "model": "Redmi S2",
    "product": "ysl",
    "createdTimestamp": 1563810378,
    "isDebugMode": false,
    "schemaVersion": 12
  },
  "id": "168bc09c-8efc-4697-b411-3d647d586b99"
}
