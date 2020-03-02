import React, { useState,useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
//import {useNetworkStatus} from '../hooks/usenetworkstatus';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import  MapGL,{Layer,Feature,ZoomControl,GeoJSONLayer,ScaleControl} from 'react-mapbox-gl';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import {useGeolocation} from '../hooks/usegeolocation'
import {useNetworkStatus} from '../hooks/usenetworkstatus'
import {useOnlineStatus} from '../hooks/useonlinestatus'
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
export default function GeoPostMapBox(props) {
   const classes = useStyles();
   const stategeo = useGeolocation();

   const[latlng,setLatLng]=useState([-66,10])
   const [zoom, setZoom] = useState(12);
   const [linearuta,setLineaRuta]=useState(props.linearuta)
   const [posruta,setPosRuta]=useState(props.posruta)
   const [pos,setPos]=useState(props.pos)
  
 
  const TOKEN="pk.eyJ1IjoiZmFyb21hcGJveCIsImEiOiJjamt6amF4c3MwdXJ3M3JxdDRpYm9ha2pzIn0.V8cqmZH6dFIcxtKoaWcZZw"
  const Map = MapGL({accessToken: TOKEN });
  const mapStyle = {  flex: 1,  height: "75vh",width: "100%"};
  
function onZoom (map, event)  {
    
    var zoomint=Math.round(map.getZoom());   
    //console.log(zoomint)
    //console.log(event)
    
    setZoom(zoomint+(event)*1.1)
}
function onZoom2 (map, event)  {
    if (map!=undefined){
    //console.log(JSON.stringify(event))
   
    var zoomint=Math.round(map.getZoom())*1.0;   
    //console.log(event)
    //console.log(zoomint)
    setZoom(zoomint*1.0)
    }
}
return (
    <div >
    <Container maxWidth="xl">

      <Grid container spacing={2} justify="center">
      
<Grid item xs={12} sm={12} md={12}>
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
   onZoom={onZoom2}
 //  onResize={onResize}
  containerStyle={mapStyle}        
 //  onControlClick={onControlClick}
 // onZoomEnd={onZoomEnd}
//onClick={this._onClickMap}  
//<ZoomControl onControlClick={onControlClick}/>

> 
<ZoomControl  onControlClick={onZoom}/>
{/* <ScaleControl /> */}

{/* <GeoJSONLayer
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
          /> */}
           {/* <GeoJSONLayer
          data={linearuta}
          circlePaint={{'circle-color': 'lightgrey','circle-radius': 4,'circle-opacity': .8}}   
          linePaint={{
            'line-color': 'lightgrey',
            'line-width': 1.5,
           'line-opacity': 0.8
          }}
          
        />    */}
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
</Map></div>
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