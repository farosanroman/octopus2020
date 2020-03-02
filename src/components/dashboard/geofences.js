import React, {useEffect, useState,Fragment } from 'react';
import DatePicker from './datepicker';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

//import { Application } from '../../App';
import  MapGL,{Layer,Feature,ZoomControl,GeoJSONLayer,ScaleControl} from 'react-mapbox-gl';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import Chart from 'react-google-charts';
//import GaugeChart from 'react-gauge-chart'
//import { greatCircle, point,circle } from '@turf/turf';

//import {usePosition} from '../hooks/useposition';
//import {useGeolocation} from '../hooks/usegeolocation';


//import {GeoAntenas} from '../helpers/geoantenas'
import {GeoKpi} from '../hooks/geokpi'

//import {antenacercana} from '../helpers/antenacercana'

import {antenas} from '../../data/antenas.json';
import {geofence1} from '../../data/geofence1.json';
import {geofence2} from '../../data/geofence2.json';
import {geofence3} from '../../data/geofence3.json';
//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
//https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

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
    }
  }));

  export default function GeoFences() {
  
//   alert(JSON.stringify(antfl))
    const classes = useStyles();

    //const { state, dispatch } = React.useContext(Application);

    //const [zoom, setZoom] = useState([state.zoom]);
    //const { latitude, longitude, timestamp, accuracy, error } = usePosition();
    //const stategeo = useGeolocation();
   
    
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = date => {
      setSelectedDate(date);
    };

 
   //var criteria={position:state.position,antenas:antenas}

  function onResize (map, event)  {
    //cuando  cambia el tamanno del explorador//
    //alert("onRezise "+map.getZoom()+" " +JSON.stringify(event))
  }
  function onZoomEnd (map, event)  {
    //console.log("onZoomEnd")
    //console.log(map.getZoom());
    var zoomint=Math.round(map.getZoom());
   
    //setZoom(zoomint)
    //dispatch({
      //  type: 'ZOOM',
     //   stateprop:zoomint
    //})
  }
   function onZoom (map, event)  {
     var zoomint=Math.round(map.getZoom());
     //alert(event)
//            setZoom(zoomint+(event)*1.1)
//            dispatch({
//      type: 'ZOOM',
//      stateprop:zoomint+(event)*1.1
 //   });
          }
      function onControlClick(map,event){
       // var z=state.zoom
       /// z+=event
       // dispatch({
       //   type: 'ZOOM',
       //   stateprop:z
       // });
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
<DatePicker />
<Map       
   //style="mapbox://styles/mapbox/streets-v8"
   //style="mapbox://styles/mapbox/dark-v9"
    style="mapbox://styles/mapbox/light-v9"
   center={[-66.8726,10.5513]} 
   //center={[longitude,latitude]} 
   zoom={[11]}
   //center={[state.position.longitude,state.position.latitude]} 
   //center={[state.position.latitude,state.position.longitude]} 
   // zoom={[zoom]}
   //onZoom={onZoom}
   onResize={onResize}
   containerStyle={mapStyle}        
   onControlClick={onControlClick}
  onZoomEnd={onZoomEnd}
//onClick={this._onClickMap}  
//<ZoomControl onControlClick={onControlClick}/>

> 
<ZoomControl  onControlClick={onZoom}/>
<ScaleControl />
<GeoJSONLayer
          data={geofence1}
          fillPaint={{'fill-color': 'dodgerblue','fill-outline-color': 'red','fill-opacity': 0.05}}

          linePaint={{
            'line-color': 'red',
            'line-width': 3
          }}
        />
        <GeoJSONLayer
          data={geofence2}
          fillPaint={{'fill-color': 'yellow','fill-outline-color': 'red','fill-opacity': 0.05}}

          linePaint={{
            'line-color': 'red',
            'line-width': 3
          }}
        />
                <GeoJSONLayer
          data={geofence3}
          fillPaint={{'fill-color': 'purple','fill-outline-color': 'red','fill-opacity': 0.05}}

          linePaint={{
            'line-color': 'red',
            'line-width': 3
          }}
        />

<Layer type="symbol" id="marker34" layout={{ 'icon-image': 'londonCycle' }} images={images}>
            {SOURCES}
      </Layer>


         
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

 