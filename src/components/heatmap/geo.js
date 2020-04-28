  
import React, {useEffect, useState,Fragment,useContext } from 'react';
import { greatCircle,destination, point,hexGrid,circle,voronoi,randomPoint ,featureCollection,nearestPoint} from '@turf/turf';

import KpiContext from '../../context/kpiContext'
import { Application } from '../../App';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DatePicker from './datepicker';
import GeoCalendar from './geocalendar';
import GeoSlider from './geoslider';
import BarStack2 from './barstack2';
import GeoBarStack from './geobarstack';
import Histogram from './histogram';

import Title from '../layout/title'
import Total from '../layout/total'

import GeoDispositivos from './geodispositivos';
import {voronoigeojson} from '../../data/voronoigeojson.json';
import 'date-fns';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
import {useFetchPost} from '../hooks/usefetchpost'
//import {useGeolocation} from '../hooks/usegeolocation';


//import {GeoAntenas} from '../helpers/geoantenas'
import {kpigeojson} from '../helpers/kpigeojson';
import {GeoKpi} from '../hooks/geokpi'
import {useKpi} from '../hooks/usekpiBORRAR'
//import {useKpiGeoJson} from '../hooks/usekpigeojsonBORRAR'
import {useKpiGeoJson} from '../hooks/usekpigeojson'
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
  const mapStyle = {  flex: 1,  height: "100vh",width: "100%"};
  
  
  const useStyles = makeStyles(theme => ({

    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'left',
      color: theme.palette.text.secondary
    },
    fixedHeight: {
      height: 200,
    }
    ,
  
   fixedHeight2: {
    height: 120,
  },
  }));

  export default function Geo(props) {
  
//   alert(JSON.stringify(antfl))
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
    const { state, dispatch } = React.useContext(Application);
    const contextKPI = useContext(KpiContext);
    //alert(JSON.stringify(contextKPI))

    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState([-66.8726,10.4713]);

    const [flagCircular, setFlagCircular] = React.useState(false);     

   
    const[fecha, setFecha]=useState(new Date())
    //const[criterio0,kpicant0,kpi2G0,kpi3G0,kpi4G0, handleKpiFiltro0,handleKpiDay0]=useKpi(celular)
   //const[criterio,kpicant,kpiRuta,kpi2G,kpi3G,kpi4G,handleKpiDay,handleKpiCriterio]=useKpiGeoJson({"type":"FeatureCollection","features":[]})
   
   const[KPIcriterio,KPIcant,KPI2Gcant,KPI3Gcant,KPI4Gcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson({"type":"FeatureCollection","features":[] })
    
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
    const[kpiday, setKpiday]=useState({"type":"FeatureCollection","features":[] })
    const[clicklocation, setClickLocation]=useState([0,0])
    const[pointlocation, setPointLocation]=useState({"type":"FeatureCollection","features":[] })
    const[lineas, setLineas]=useState({"type":"FeatureCollection","features":[] })
    const[pointFeatureCollection,setPointFeatureCollection]=useState({"type":"FeatureCollection","features":[] })
    const[randompoints, setRandomPoints]=useState({"type":"FeatureCollection","features":[] })
    const[circle1, setCircle1]=useState({"type":"FeatureCollection","features":[] })
    const[circle2, setCircle2]=useState({"type":"FeatureCollection","features":[] })
    const[circle3, setCircle3]=useState({"type":"FeatureCollection","features":[] })
    
    const [data, isLoading, isError , fetchData] = useFetch(""); 
    const [ dataPost, isLoadingPost, isErrorPost , postData] = useFetchPost('');
//console.log("GEO")
    const handleDateChange = date => {
      setSelectedDate(date);
    };
    useEffect(() => {
      //alert(antenas.length)
  },[]);
useEffect(() => {
   // console.log("GEO useEffect [] "+props.filtro2GA+" "+props.filtro3GA+" "+props.filtro4GA)
    setchecked2G(props.filtro2GA)
    setchecked3G(props.filtro3GA)
    setchecked4G(props.filtro4GA)
},[props.filtro2GA,props.filtro3GA,props.filtro4GA]);


useEffect(() => {
  
setKpiday(data)  
},[KPI]);

useEffect(() => {
  //handleKpiFiltro({"G2G":true,"G3G":true,"G4G":true})
  //alert(JSON.stringify({"G2G":checked2G,"G3G":checked3G,"G4G":checked4G}))
  handleKPICriterio({"G2G":checked2G,"G3G":checked3G,"G4G":checked4G})

//  setCriterio({"G2G":true,"G3G":true,"G4G":true})
//alert("[]")
},[checked2G,checked3G,checked4G]);
useEffect(() => {
  //alert(JSON.stringify(clicklocation))
  if (JSON.stringify(clicklocation)!="[0,0]"){
  setPointLocation(
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates":clicklocation
          }
        }
      ]
    })
  //   var options = {
  //     //bbox : [-73,7,-62,12]
  //     //bbox: [-66.934,10.45114, -66.841, 10.511]
  //     bbox: [-66.95,10.43, -66.78, 10.5]
  //   };
  //   var cantidad=100+Math.floor(Math.random() * 2000)*1;
  //  var points = randomPoint(cantidad, options);
  // // console.log(points)
  //  var pointFeatures = {
  //   "type": "FeatureCollection",
  //   "features": points};
  //   var pointsFeatureCollection={"type":"FeatureCollection","features":[] }
  //   var f = points.features.map((feature, i) => {

  //     //

  //   var mobiles=["2G","3G","4G"];
  //   var random=Math.floor(Math.random() * 3)*1;
  //   var random2=Math.floor(Math.random() *1000)*1;
  //  // console.log("pos "+random)
  //   var newkpi= {
  //     "ttl":30,
  //     "type": "Feature",
  //     "properties": {
  //     "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
  //     "timestamp": new Date(),
  //     "identification":"state.login.email",
  //     "mobilegeneration":mobiles[random],
  //     "cellid": 11111,
  //     "cidreported": 11111,
  //     "downlink":random2,
  //     "rtt":random2,
  //     "mcc": 734,
  //     "mnc": 2,
  //     "signaltype":mobiles[random],
  //     "signalstrength": 27,
  //     "rsrq": -11,
  //     "rsrp": -89, },

  //         "geometry": {
  //         "type": "Point",
  //         "coordinates":feature.geometry.coordinates
  //        }
  //     }
  //     pointsFeatureCollection.features.push(newkpi)
  //   })
  //   //setRandomPoints(pointsFeatureCollection)
  //  // alert("fin")
  //  setPointFeatureCollection(pointsFeatureCollection)
  //   handleKPIDay(pointsFeatureCollection )
   }
   var centro=clicklocation
  var options = {steps: 100, units: 'kilometers', properties: {foo: 'bar'}};
  var circle1 = circle(centro, 1, options);
  var circle2 = circle(centro, 2, options);
  var circle3 = circle(centro, 3, options);
setCircle1(circle1)
setCircle2(circle2)
setCircle3(circle3)
},[clicklocation]);


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
 // console.log("data useFetch hook")
 // console.log(data)
  if (JSON.stringify(data)!="[]"){
  handleKPIDay(data )
  }
  
   setFlagCircular(false)
   
  }
},[data,isLoading]);


  function clickDay (newday)  {
    //alert("clickDay "+newday)
    //var newfecha=newday.split("-")
    //newday=newfecha[1]+"/"+newfecha[2]*1+"/"+newfecha[0]
    ///alert(newday)
    //handleKPIFiltroDay(newday)
    //alert(newday)
    setFecha(newday)
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
  function createRandom(){
   // alert('createtrandom')
   // https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/?utm_source=RisingStack+Blog&utm_campaign=13c6d79d5c-reinventing-hooks-with-react-easy-state&utm_medium=email&utm_term=0_02a6a69990-13c6d79d5c-475171197
    //points.features.map((feature, i) => {
      var poin = point(clicklocation);
var distance = 5;
var bearing = -135;
var options = {units: 'kilometers'};

var p1 = destination(poin, distance, bearing, options);
var poin2 = point(clicklocation);
var distance2 = 5;
var bearing2 = 45;
var options2 = {units: 'kilometers'};

var p2 = destination(poin2, distance2, bearing2, options2);
//alert(JSON.stringify(destinatio.geometry.coordinates))
      var options = {
        //bbox : [-73,7,-62,12]
        //bbox: [-66.934,10.45114, -66.841, 10.511]
        bbox: [p1.geometry.coordinates[0],p1.geometry.coordinates[1], p2.geometry.coordinates[0],p2.geometry.coordinates[1]]
      };
      var cantidad=100+Math.floor(Math.random() * 2000)*1;
     var points = randomPoint(cantidad, options);
     var pointFeatures = {
      "type": "FeatureCollection",
      "features": points};
      var pointsFeatureCollection={"type":"FeatureCollection","features":[] }
      var f = points.features.map((feature, i) => {
  
        //
  
      var mobiles=["2G","3G","4G"];
      var random=Math.floor(Math.random() * 3)*1;
      var random2=Math.floor(Math.random() *1000)*1;
     // console.log("pos "+random)
      var newkpi= {
        "ttl":60,
        "type": "Feature",
        "properties": {
        "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
        "timestamp": new Date(),
        "identification":"state.login.email",
        "mobilegeneration":mobiles[random],
        "cellid": 11111,
        "cidreported": 11111,
        "downlink":random2,
        "rtt":random2,
        "mcc": 734,
        "mnc": 2,
        "signaltype":mobiles[random],
        "signalstrength": 27,
        "rsrq": -11,
        "rsrp": -89, },
  
            "geometry": {
            "type": "Point",
            "coordinates":feature.geometry.coordinates
           }
        }
        pointsFeatureCollection.features.push(newkpi)
      })
      //setRandomPoints(pointsFeatureCollection)
     // alert("fin")
     setPointFeatureCollection(pointsFeatureCollection)
      handleKPIDay(pointsFeatureCollection )
     
  
  }  
 function postRandom(){
  //alert('postrandom')
  //points.features.map((feature, i) => {
  pointFeatureCollection.features.map((feature, i) => {
    console.log(i+" "+i)
       postData("https://octopustestingfunctions.azurewebsites.net/api/PostKPI?code=L4A3rCSSFFI5lvQfBBK2yCWG1Hr4ZaHZahfSoISNpKSlIiQ5J3NySA==",feature)
   
  })
  

}
function asociarAntenas(){
  var antenasfeatures=[]
antenas.map((a, i) => {
      antenasfeatures.push(point([a.lon, a.lat]))
})
var antenaspoints = featureCollection(antenasfeatures);
//alert(JSON.stringify(antenasfeatures))
// var antenaspoints2 = featureCollection([
//     point([28.973865, 41.011122]),
//     point([28.948459, 41.024204]),
//     point([28.938674, 41.013324])
// ]);
//alert(JSON.stringify(pointFeatureCollection.features[0]))
var targetantenaPoint = point(pointFeatureCollection.features[0].geometry.coordinates, {"marker-color": "#0F0"});
//alert(JSON.stringify(targetantenaPoint))
var nearestantena = nearestPoint(targetantenaPoint, antenaspoints);
//alert("neaest "+JSON.stringify(nearestantena))
var lineasjsonn={
  "type": "FeatureCollection",
  "features": []
}

var linea0={
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "LineString",
    "coordinates": [
      pointFeatureCollection.features[0].geometry.coordinates
      ,
      nearestantena.geometry.coordinates
    ]
  }
}
lineasjsonn.features.push(linea0)
  pointFeatureCollection.features.map((feature, i) => {
    var targetKpiPoint = point(pointFeatureCollection.features[i].geometry.coordinates, {"marker-color": "#0F0"});
    var nearestantena = nearestPoint(targetKpiPoint, antenaspoints);
    var lineaKpiAntena={
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          pointFeatureCollection.features[i].geometry.coordinates
          ,
          nearestantena.geometry.coordinates
        ]
      }
    }
    lineasjsonn.features.push(lineaKpiAntena)

  })

//   var targetPoint = point([28.965797, 41.010086], {"marker-color": "#0F0"});

// var nearest = nearestPoint(targetPoint, antenaspoints);
// alert(JSON.stringify(nearest))
var lineasjson=
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.84837341308594,
            10.445610623552714
          ],
          [
            -66.83155059814453,
            10.455064204354326
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -66.82193756103516,
            10.429741466565432
          ],
          [
            -66.807861328125,
            10.456077070945142
          ]
        ]
      }
    }
  ]
}

setLineas(lineasjsonn)


}
 function onControlClick(map,event){
    alert("onControlClick")
    //console.log(event)
   
  }
  function onClickMap(map,event){
   // alert("click")
    //console.log(event.lngLat.lng+" "+event.lngLat.lat)
    setClickLocation([event.lngLat.lng,event.lngLat.lat])
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
 //  var antenasFeatureCollection={"type":"FeatureCollection","features":[] }
   var antenasFeatureCollection={"type":"FeatureCollection","features":[] }
    
const A=antenas.map((nodo,index)=>{  
  //sources proveedores de enlaces   
  var antenafeature= {
    "type": "Feature",
    "properties": {
    "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
    "timestamp": new Date()},
    "geometry": {
        "type": "Point",
        "coordinates":[nodo.lon,nodo.lat]
       }
    
  }
    antenasFeatureCollection.features.push(antenafeature) 
})
//console.log("ANTENAAAAS")
//console.log(antenasFeatureCollection)
const ANTENAS=antenas.map((nodo,index)=>{  
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
    <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Calendario de Actividades</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              
              <Paper className={fixedHeightPaper}>

               <GeoCalendar days={state.days} clickday={clickDay} />
              </Paper>
            </Grid>
         </Grid>
        </ExpansionPanelDetails>

      </ExpansionPanel>
    {flagCircular&&<CircularProgress variant="indeterminate"   disableShrink  size={17}   thickness={4} className={classes.progress} />}
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
           <Total titulo={'Messages'} indicador={'Totalhh'} color={'#1bc943'} bcolor={"rgba(27, 201, 67, 0.15)"} porc={45} total={KPIcant} leyenda={'Total del Dia'}/>
      </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'2G Signaltype'} indicador={'Totalhh'} color={'#1bc943'} bcolor={"rgba(27, 201, 67, 0.15)"} porc={45} total={KPI2Gcant} leyenda={'Dispositivos Activos'}/>
      </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'3G Signaltype'}  total={KPI3Gcant}leyenda={'Dispositivos Activos'}/>
      </Paper>
   
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Paper className={fixedHeightPaper2}>
          <Total titulo={'4G Signaltype'}   total={KPI4Gcant} leyenda={'Dispositivos Activos'}/>
      </Paper>
   
      </Grid>
      
      </Grid>   
     
    <Grid container spacing={3}>
            {/* Chart */}
            

            <Grid item xs={12} md={6} lg={6}>
              
              <Paper className={fixedHeightPaper}>
              <GeoDispositivos titulo={'Actividad de Dispositivos'} kkppii={KPI} fecha={fecha} />
               </Paper>
            </Grid>


            <Grid item xs={12} md={6} lg={6}>
              
              <Paper className={fixedHeightPaper}>
              <GeoBarStack titulo={'Sygnal Type'}  kpi2Gcant={KPI2Gcant} kpi3Gcant={KPI3Gcant} kpi4Gcant={KPI4Gcant} />
             
               </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              
              <Paper className={fixedHeightPaper}>
              <Histogram titulo={'Histogram Round Trip Time'}  kkppii={KPI} fecha={fecha} />
               </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
            <Paper >


      <Divider />
      <GeoSlider />
    {/* <Button  variant="contained" color="primary"  onClick={() => buttonclick()}>
                   Refrescar
                  // </Button> */}
{/* <DatePicker clickday={clickDay}/> */}
</Paper>
</Grid>
</Grid>
 
<Grid container spacing={3}>

<Grid item xs={12} sm={12} md={12}>
      <Paper className={fixedHeightPaper}>
      <table><tr><td><Title>{'Distribucion Geoespacial'}</Title></td><td> <Button variant="contained" color="secondary" onClick={createRandom}  className={classes.button} >Generacion</Button></td><td> <Button variant="contained"  onClick={postRandom} color="primary" className={classes.button} >Registro</Button></td><td> <Button variant="contained"  onClick={asociarAntenas} color="primary" className={classes.button} >Asociar Antenas</Button></td></tr></table>
      <Map       
  // style="mapbox://styles/mapbox/streets-v8"
   style="mapbox://styles/mapbox/dark-v9"
   containerStyle={{
    height: '1000px',
    width: '100vw'
  }}
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
   onControlClick={onControlClick}
   onClick={onClickMap}  
  //onControlClick={onControlClick}
//onClick={this._onClickMap}  
//<ZoomControl onControlClick={onControlClick}/>

> 

<ZoomControl  position={"bottomRight"}/>
<ScaleControl />
      
        
        <Layer type="line" 
         paint={ {'line-color': '#4790E5',  'line-width': 12}}>
          <Feature coordinates={lineas} />
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
      {/* <GeoJSONLayer
          data={KPIRuta}
          circlePaint={{'circle-color': 'lightgrey','circle-radius': 2,'circle-opacity': .8}}   
          linePaint={{
            'line-color': 'lightgrey',
            'line-width': .4,
           'line-opacity': 0.3
          }}
          
        /> */}
      <GeoJSONLayer
          data={lineas}
          circlePaint={{'circle-color': 'lightgrey','circle-radius': 2,'circle-opacity': .8}}   
          linePaint={{
            'line-color': 'red',
            'line-width': 2,
           'line-opacity': .5
          }}
          
        />
          <GeoJSONLayer
          data={randompoints}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': '#00FFFF','circle-radius': 4}}         
         
          />
        <GeoJSONLayer
            data={pointlocation}
             circleLayout={{ visibility: 'visible' }}
            circlePaint={{'circle-color': 'white','circle-radius': 6,'circle-opacity': 1,'circle-stroke-color': 'white' , 'circle-stroke-width': 8,'circle-blur': 0.9,}}         
         
          />
          <GeoJSONLayer
            data={voronoigeojson}
            fillPaint={{'fill-color': 'Orange','fill-outline-color': 'white','fill-opacity':.000013}}
            linePaint={{
             'line-color': 'deepskyblue',
             'line-width': 2
            }}
          
        />  
                  <GeoJSONLayer
          data={circle1}
          circlePaint={{'circle-color': 'pink','circle-radius': .5, }}   
          linePaint={{
            'line-color': 'yellow',
            'line-width': 2
          }}
          
        />    
              <GeoJSONLayer
          data={circle2}
          circlePaint={{'circle-color': 'pink','circle-radius': .5, }}   
          linePaint={{
            'line-color': 'yellow',
            'line-width': 2
          }}
          
        />    
      <GeoJSONLayer
          data={circle3}
          circlePaint={{'circle-color': 'pink','circle-radius': .5, }}   
          linePaint={{
            'line-color': 'yellow',
            'line-width': 2
          }}
          
        />   
          <GeoJSONLayer
          data={antenasFeatureCollection}
          circleLayout={{ visibility: 'visible' }}
          circlePaint={{'circle-color': 'white','circle-radius': 4,'circle-opacity': 1,'circle-stroke-color': 'whitesmoke' , 'circle-stroke-width': 2,'circle-blur': 0.9, }}         
           
         
          />
           <Layer type="symbol" id="marker34" layout={{ 'icon-image': 'londonCycle' }} images={images}>
            {ANTENAS}
      </Layer>

 {/* <GeoJSONLayer
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
          /> */}
         
</Map>
     
      </Paper>
 </Grid >
 </Grid > 
{/* //https://res.cloudinary.com/dzc4dgpyi/image/upload/v1560300064/Torrecitas-02.png */}


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
