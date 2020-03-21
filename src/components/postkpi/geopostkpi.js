import React, { useState,useEffect } from 'react';
import { Application } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
//import {useNetworkStatus} from '../hooks/usenetworkstatus';
//import { Application } from '../../App';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import  MapGL,{Layer,Feature,ZoomControl,GeoJSONLayer,ScaleControl} from 'react-mapbox-gl';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

//mport GeoPostMapBox from './geopostmapbox'
import {useGeolocation} from '../hooks/usegeolocation'
import {useNetworkStatus} from '../hooks/usenetworkstatus'
import {useOnlineStatus} from '../hooks/useonlinestatus'
import {useFetchPost} from '../hooks/usefetchpost'
import CircularProgress from '@material-ui/core/CircularProgress';
import { ActionSettingsInputComposite } from 'material-ui/svg-icons';
import {distance,point} from '@turf/turf';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 2),
    },
    heroButtons: {
      marginTop: theme.spacing(2),
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
export default function GeoPostKpi() {
   // const stategeo = useGeolocation();
   const classes = useStyles();
   //const { state, dispatch } = React.useContext(Application);
   const [flagCircular, setFlagCircular] = React.useState(false);
   const TOKEN="pk.eyJ1IjoiZmFyb21hcGJveCIsImEiOiJjamt6amF4c3MwdXJ3M3JxdDRpYm9ha2pzIn0.V8cqmZH6dFIcxtKoaWcZZw"
   const Map = MapGL({accessToken: TOKEN });
   const mapStyle = {  flex: 1,  height: "50vh",width: "100%"};
 
   const stategeo = useGeolocation();
  const connection = useNetworkStatus();
  const  onlineStatus = useOnlineStatus();
  const { state, dispatch } = React.useContext(Application);
  const [kpi,setKpi]=useState(
    {
      "type": "Feature",
      "properties": {
        "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
        "timestamp": "12/22/2018 11:00",
        "mobilegeneration": connection.effectiveType.toUpperCase(),
        "cellid": 100301,
        "identification":state.login.email,
        "cidreported": 2567681,
        "downlink":connection.downlink,
        "rtt":connection.rtt,
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
          stategeo.longitude,
          stategeo.latitude
     
        ]
      }
    }

  )
  const [pos,setPos]=useState({
   "type": "FeatureCollection",
   "features": [
     {
       "type": "Feature",
       "properties": {
        
         "marker-symbol": "telephone"
       },
       "geometry": {
         "type": "Point",
         "coordinates": [
           stategeo.longitude,
           stategeo.latitude
         ]
       }
     }]})
 
  const [hipotenusa,setHipotenusa]=useState(0)
   const[latlng,setLatLng]=useState([-60,10])
   const [zoom, setZoom] = useState(12);
   const [linearuta,setLineaRuta]=useState(
    {
      
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": 
              []
               
              
            }
          }
        ]
      }
   )


   const [posruta,setPosRuta]=useState({
    "type": "FeatureCollection",
    "features": []})
   const [ dataPost, isLoadingPost, isErrorPost , postData] = useFetchPost('');

//////////////////////////////////////////////////////////////
   useEffect(() => {
    var from = point(latlng);
    var to = point([stategeo.longitude*1.0,stategeo.latitude*1.0]);
    var option = {units: 'kilometers'};
    var dist = distance(from, to, option);
    dist=Math.round(dist*1000)//mts
    setHipotenusa(dist)

   if ((stategeo.longitude!=null)&&(onlineStatus)&&(hipotenusa>10)){
    setLatLng([stategeo.longitude,stategeo.latitude]) 
    var newkpi= {
      "type": "Feature",
      "properties": {
        "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
        "timestamp": new Date(),
        "identification":state.login.email,
        "mobilegeneration": connection.effectiveType.toUpperCase(),
        "cellid": 11111,
        "cidreported": 11111,
        "downlink":connection.downlink,
        "rtt":connection.rtt,
        "mcc": 734,
        "mnc": 2,
        "signaltype":connection.effectiveType.toUpperCase(),
        "signalstrength": 27,
        "rsrq": -11,
        "rsrp": -89,
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          stategeo.longitude,
          stategeo.latitude
     
        ]
      }
    }
    
      var newruta=posruta
      newruta.features.push(newkpi)
      
      var newlinea=linearuta
      newlinea.features[0].geometry.coordinates.push([
        stategeo.longitude,
        stategeo.latitude
      ])
    setPos({
      "type": "FeatureCollection",
      "features": [
            newkpi  
      ]})
      console.log("newrkpi")  
      console.log(JSON.stringify(newkpi))
      console.log("newruta")
      console.log(JSON.stringify(newruta))
      console.log("newline")
      console.log(JSON.stringify(newlinea))
 
      setPosRuta(newruta)
      setLatLng([ stategeo.longitude,stategeo.latitude])
      setLineaRuta(newlinea)
      setKpi(newkpi)
    }
},[stategeo.timestamp,connection.effectiveType,onlineStatus]);
///////////////////////////////////////
// useEffect(() => {

// dispatch({
//   type: 'LOGIN',
//   stateprop: {id:222}
// });
// }, []);
useEffect(() => {
 // alert(JSON.stringify(kpi))
  if ((kpi.geometry.coordinates[0]!=null)&&(kpi.geometry.coordinates[0]<0)){
   // alert("post"+JSON.stringify(kpi))
     setFlagCircular(true)
     postData("https://octopustestingfunctions.azurewebsites.net/api/PostKPI?code=L4A3rCSSFFI5lvQfBBK2yCWG1Hr4ZaHZahfSoISNpKSlIiQ5J3NySA==",kpi)
  }
},[kpi]);

useEffect(() => {
//alert(JSON.stringify(dataPost))
setFlagCircular(false)
},[dataPost]);


function onZoom (map, event)  {
  
  var zoomint=Math.round(map.getZoom());
  console.log(zoomint)
  //setZoom(zoomint)
 //  setZoom(zoomint+(event)*1.1)
    
}
function onZoomEnd (map, event)  {
  //console.log("onZoomEnd")
  //console.log(map.getZoom());
  var zoomint=Math.round(map.getZoom());
 
  setZoom(zoomint)
  //dispatch({
    //  type: 'ZOOM',
   //   stateprop:zoomint
  //})
}
function onControlClick (map, event)  {
  
  var zoomint=Math.round(map.getZoom());
  //dispatch({
  //  type: 'ZOOM',
  //  stateprop:zoomint
  //});
          //setZoom([map.getZoom()])    
    //alert(zoomint+" "+event)
       
          setZoom(zoomint+(event)*1.1)
    
}
return (
    <div >
    <Container maxWidth="xl">
      <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={12} md={12}>
        <Paper >
        <Typography component="h7"  align="center" color="textPrimary" >
       <h1> Simulador</h1>
      </Typography>
      <h1>{onlineStatus ? "Online" : "Offline"}</h1>
      <Typography variant="h7" align="center" color="textSecondary" >
<div><b>GeoTimer:</b> lng:{Math.round(stategeo.longitude*10000)/10000} lat:{Math.round(stategeo.latitude*10000)/10000} accu:{stategeo.accuracy*1} dist:{hipotenusa}</div>
         </Typography>
         <Typography variant="h7" align="center" color="textSecondary" >
         <div><b>NetWorkStatus:</b>  downlink: {connection.downlink} effectiveType: {connection.effectiveType} rtt: {connection.rtt} saveData: {connection.saveData ? "yes" : "no"}</div>
<div><b>GeoJson:</b>[{linearuta.features[0].geometry.coordinates.length}] </div>
         </Typography>
         
          
          </Paper>
          
</Grid>
<Grid item xs={12} sm={12} md={12}>
  
{flagCircular&&<CircularProgress variant="indeterminate"   disableShrink  size={17}   thickness={4} className={classes.progress} />}
          <div className={classes.root}>
          <Map       
   //style="mapbox://styles/mapbox/streets-v8"
   style="mapbox://styles/mapbox/dark-v9"
   // style="mapbox://styles/mapbox/light-v9"
   center={latlng} 
   //center={[longitude,latitude]} 
   zoom={[zoom]}
   //center={[state.position.longitude,state.position.latitude]} 
   //center={[state.position.latitude,state.position.longitude]} 
   // zoom={[zoom]}
   onZoom={onZoom}
   onZoomEnd={onZoomEnd}
 //  onResize={onResize}
  containerStyle={mapStyle}        
   //onControlClick={onControlClick}
 // onZoomEnd={onZoomEnd}
//onClick={this._onClickMap}  
//

> 
<ZoomControl position={"bottomRight"} />
{/* <ScaleControl /> */}

<GeoJSONLayer
          data={posruta}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'lightgray','circle-radius': 4}}         
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
          data={linearuta}
          circlePaint={{'circle-color': 'lightgrey','circle-radius': 4,'circle-opacity': .8}}   
          linePaint={{
            'line-color': 'lightgrey',
            'line-width': 1.5,
           'line-opacity': 0.8
          }}
          
        />   
<GeoJSONLayer
          data={pos}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'white','circle-radius': 8,'circle-opacity': 0.5,'circle-stroke-color': 'white' , 'circle-stroke-width': 2,'circle-blur': 0.9,}}         
         
          />    
 <GeoJSONLayer
          data={pos}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'yellow','circle-radius': 4}}         
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
</Map>

</div>
{/* <GeoPostMapBox pos={pos} linearuta={linearuta} posruta={posruta}/> */}
      </Grid>
 
    </Grid>
  </Container>


    <Container maxWidth="xl">
     
         
       
    
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            {/* <Button  variant="contained" color="primary"  onClick={() => prop.loginclick()}>
            Conexión
            </Button> */}
          </Grid>
        </Grid>
      </div>
    </Container>
  </div>
    

)


}
// var kpijson=
 
//   {
//     "type": "Feature",
//     "properties": {
//       "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
//       "timestamp": "12/22/2018 11:00",
//       "mobilegeneration": "4G",
//       "cellid": 100301,
//       "cidreported": 2567681,
//       "downlink":2.22,
//       "rtt":100,
//       "mcc": 734,
//       "mnc": 2,
//       "lac": 700,
//       "loc": 1,
//       "lon": -66.85489415,
//       "lat": 10.46507604,
//       "signaltype": "LTE",
//       "signalstrength": 27,
//       "rsrq": -11,
//       "rsrp": -89,
//       "bhealth": "GOOD",
//       "blevel": 1,
//       "bsource": "AC",
//       "bstatus": "FULL",
//       "btemp": 242,
//       "bvolts": 4346,
//       "bslon": "NULL",
//       "bslat": "NULL",
//       "status": "NULL"
//     },
//     "geometry": {
//       "type": "Point",
//       "coordinates": [
//       0,0 
//       ]
//     }
//   }


var drone=
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "marker-color": "#00ff00",
          "marker-size": "medium",
          "marker-symbol": "telephone"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -66.884765625,
            9.817329187067783
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "marker-color": "#0080ff",
          "marker-size": "medium",
          "marker-symbol": ""
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -66.29150390625,
            9.687398430760624
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "marker-color": "#8000ff",
          "marker-size": "medium",
          "marker-symbol": "oil-well"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -65.72021484375,
            9.622414142924805
          ]
        }
      }
    ]
  }

  