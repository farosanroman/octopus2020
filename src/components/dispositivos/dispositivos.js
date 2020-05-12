import React ,{useEffect,useState,useContext} from 'react';
//import { greatCircle, point ,randomPoint,voronoi} from '@turf/turf';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dispositivo from     '../dispositivos/dispositivo'
import KpiContext from '../../context/kpiContext'

import { makeStyles } from '@material-ui/core/styles';
import { greatCircle, point,hexGrid,circle,voronoi,randomPoint } from '@turf/turf';

import {useFetch} from '../hooks/usefetch'; 

import  MapGL,{Layer,Feature,ZoomControl,GeoJSONLayer,ScaleControl} from 'react-mapbox-gl';
import {useKpiGeoJson} from '../hooks/usekpigeojson'

import CircularProgress from '@material-ui/core/CircularProgress';


import {antenas} from '../../data/antenas.json';
import {jsonantenas} from '../../data/jsonantenas.json';

//import {WORLD} from '../../data/WORLD.json';
//import {PAMIRANDA} from '../../data/PAMIRANDA.json';
//import {LIBERTADOR} from '../../data/libertador.json';
import {CIUDADESGEO} from '../../data/ciudadesgeo.json';
let image = new Image();
image.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAr0lEQVQ4T92VQRKAMAgD9ef8XIeOOBBD6FmPLSyBAp7H8JnZlU3M7FQu9LKD7MA/wHDKSnbPXHkBZkdUg2l6QBboBTJYVy9lW4AYtVPJ7CI4BXbpeNqoLmwLcDIi9bsyKPsvhX6g0lDAx389kDO2gPiaSkABotqoiwJmm1chA3WtMdVbtk3UbpqUKEGZFBZ5ArL2akcPNszaODg5cvTUSmKOnb3cbSrlnwOn30S+vwH7HygkEWrDEQAAAABJRU5ErkJggg=="
//image.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEaElEQVQ4T4WUe2xURRTGvzP3se0uW7p1KaUtFGwrpUtLQQIkAhFR0QiEaEiIRgOJJEACJIaASjE3UKIVEmNJhATjK2p8xIiIIaAExf6BofJsm9ay2GJLm4W228cuu3vvzDF7SRsEGuePSWbmfL/5zsycIYzVmMkCtKxOGD2xW3o6LM8XdAYLYVuABBE/SEoPmrQa2Ct8qWJS2nRmZwoTZaXjiHmQSL/OQraqmBm25lL8Xv19wJ0XuSDDtFcqUJFg3FRQPbZELC00NPgERJ4iTBDgjkTKObq3ytt1N/Q/wD0tPA3K3sygvhjj1/Yh9VDcUSEizr3jkCIZumia6he94whLoDgA3Tiwq4z+HoGOAq3WwSBJzzbBfDOc8nzXfzuxjhmFBNSbpDWlBSmWIQUsYladeYb4eIqXXmCNggaZ+96cQb3upunOOs26yE09L4DZ3Unz0PV4citDDl8bVl83R6kAGqpcBxIXZ2UbXUV+tQYg7+RMT91ET2oDQftTRrQj1hJyXODeZp4kVWoDKz57YUiVKKD4fB++7IzLZRCcBaY2F0hcCkWDhV7txJwc8SJYXa0KiLAOWqCReWhnOXUTmGl3iz0Hild2xdSpbps3Dtio+y2i5gHQMDD8fXa4JxswkHgkOJAY51sFwc7SoHbOp2HLZA8dnOTTlyrBR98qM86TxSyMFucpZsxqHFTX4o5aejpivzfkiE1w8FHOhfZSCLXNdajE/r5HC65CGOv8uvrg8VzjNa/gUxXZxjSpcIlD+s+0+hvWKkPyOUGquKFfRiWj9OgN53OQ2IRItDano3cXiNa6QOZP+soK9iArczuUPLgiX3/Z0NA6268FQCp8ucnzk+tQa3aeJsiZF4ZVly0x/8RN52AyRZuR4AM5jdcXE1Dj8hR29lVO+R0ZtNnDfGBZgb7R1LSzVX5RyECjLNdP3jnDZnsegZ9pj6n6SIrX96fU2/W3eDmIbqC7+1hOZ6I6DewrzKjBxPwVIExaGORjAVO8kW/S4UK/vpAUH68uN865t1xzJT5ZCeNVR6H+8oCzQAE4E8GZqONUQNOOBP649lI6rn/+w19AylXZBhoXTRCLhQIqAtpZU9BjQskPqyu8/7jAujb2RKVcDcVT22LqSDQhN0qIv9oSdLKtP9IeaBjY4gLnjq8rDeROLfHIZYZAyXiPdmi6T6xSrNqzTfPbLaWUHK2U2hbOT0h7OzGaLw2r07bCemZuHkplfHXpeNPWNHDWs6H3/WZiDTGXG7o4XOkXTxCjTOnGPquMboxWykgd7rmSnAFB1Qp0Pgr9h47eeEzr8UZ+aWhyn82Tc0P7ZV48t8in+QKZYjmB50nH3G1VUst9tTwKbeNiTjprCSpFQn1WXZ7ZEdjeuMNN+d2ZtTXNt4tYiVcghAEpP91VkREe87cZWXgnzONTMbtEeYwOazrduhtotXJQJO0i02dcfb2YBu6G3ZfyvYsj48COxhWuw9qZP44VM2bKDxRYTaY7b4VS/wf8F26OCjLnxzKcAAAAAElFTkSuQmCC"
const images= ['londonCycle', image];
var linearoja={"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-66,9],[-80.31606674194336,25.77392392167507]]}}]}
const style={   Paper:{padding:1,marginTop:1,marginBottom:1}}
const TOKEN="pk.eyJ1IjoiZmFyb21hcGJveCIsImEiOiJjamt6amF4c3MwdXJ3M3JxdDRpYm9ha2pzIn0.V8cqmZH6dFIcxtKoaWcZZw"
  const Map = MapGL({accessToken: TOKEN });
  const mapStyle = {  flex: 1,  height: "50vh",width: "100%"};

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      background: 'black',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    fullWidth: true,
    //display: 'flex',
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


//console.log(greatCircle([0, 0], [100, 10]));//
//console.log(point([150, 0]));
var options = {
    bbox : [-67.07,10.57, -66.81, 10.62]
    //bbox: [-66.934,10.45114, -66.841, 10.511]
    //bbox: [-67.3,9.985, -65.52, 10.5]//antenas
  };
 var points = randomPoint(100, options);
 var pointFeatures = {
  "type": "FeatureCollection",
  "features": points};
 // alert(JSON.stringify(points))
 // var voronoiPolygons = voronoi(points, options);
// console.log(JSON.stringify(points))
var voronoiRandom = voronoi(points, options);
//  console.log("voronoirandom")
//  console.log(JSON.stringify(voronoiRandom))

  


export default function Dispositivos() {
  const classes = useStyles();
  const contextKPI = useContext(KpiContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  //const[KPIcriterio,KPIcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson2([])
     
  //const[KPIcriterio,KPIcant,KPI2Gcant,KPI3Gcant,KPI4Gcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson([])
  
  const[KPIcriterio,KPIcant,KPI2Gcant,KPI3Gcant,KPI4Gcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson({"type":"FeatureCollection","features":[] })
   
  const [data, isLoading, isError , fetchData] = useFetch(""); 
  const [dataCircle, isLoadingCircle, isErrorCircle , fetchDataCircle] = useFetch(""); 
  const [circle1, setCircle1] = useState({"type":"FeatureCollection","features":[] });
  const[clicklocation, setClickLocation]=useState([0,0])
  const [zoom, setZoom] = useState(16);
  const [center, setCenter] = useState([-66.8726,10.4713]);
  const [rows, setRows] = useState([]);

  const [flagCircular, setFlagCircular] = React.useState(false);     

  // var centro=[-66.867900,10.4671]
  // var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
  // var circle1 = circle(centro, .5, options);
  // var circle2 = circle(centro, 1, options);
  // var circle8 = circle(centro, 8, options);

  // var bbox = [-66.807900,10.4071,-66.70,12.4071];
  var bbox  = [-96,31,-84,40];
   var cellSide = 55;
   var options = {units: 'kilometers'};
  const [age, setAge] = React.useState('');
  
  var hexgrid = hexGrid(bbox, cellSide, options);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
  fetchData('https://octopustestingfunctions.azurewebsites.net/api/GetKPIDay?code=ophd6G5J32nZT0jZHMoDXr7FEHoRMiQFa876XZ35TpWkmjIBJziHZw==&id=2020-04-19');
  
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
   // console.log(JSON.stringify(data))
  // alert("fetch"+JSON.stringify(data))
   
  handleKPIDay(data)
  //  setFlagCircular(false)
   
  }
},[data,isLoading]);


function onClickMap(map,event){
  var centro=[event.lngLat.lng,event.lngLat.lat]

  //alert(JSON.stringify(centro))
  var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
  var circle1 = circle(centro, 1, options);
setCircle1(circle1)
setClickLocation(centro)  
  //alert("click")
   //console.log(event.lngLat.lng+" "+event.lngLat.lat)
  // setClickLocation([event.lngLat.lng,event.lngLat.lat])
 }
 useEffect(() => {
  // alert("ANTENAS   "+JSON.stringify(pointFeatureCollection.features))
  fetchDataCircle('https://octopustestingfunctions.azurewebsites.net/api/GetKPIDay?code=ophd6G5J32nZT0jZHMoDXr7FEHoRMiQFa876XZ35TpWkmjIBJziHZw==&id=2020-04-19');
  
   },[clicklocation]);
   function createData(id,number,  country,brand,model,cpu) {
    return { id,number,  country,brand,model,cpu};
  } 
 useEffect(() => {
  //alert("in "+option)
 //alert(JSON.stringify(data))
  if (isLoadingCircle) {
    //setFlagCircular(true)
  }
  //alert(data[0].type)
  if ((dataCircle!=undefined)&&(!isLoadingCircle))      
  {
   // console.log(JSON.stringify(data))
  //alert("fetch"+JSON.stringify(dataCircle))
   //if (JSON.stringify(dataCircle)!="[]"){
  //  alert("fetch"+JSON.stringify(dataCircle))
  //id,number,  country,brand,model,cpu
   const rows = [
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
    createData('16002','+58-412-6340699', 'VE','xiaomi','Redmi S2','armeabi-v7a,armeabi'),
   
  ];
setRows(rows)
//}
  
  // handleKPIDay(data)
  //  setFlagCircular(false)
   
  }
},[]);

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

    
     var antenasFeatureCollection2G={"type":"FeatureCollection","features":[] }
     var antenasFeatureCollection3G={"type":"FeatureCollection","features":[] }
     var antenasFeatureCollection4G={"type":"FeatureCollection","features":[] }
     
//      const A=jsonantenas.map((nodo,index)=>{  
//       //sources proveedores de enlaces   
//       //console.log(Math.floor(Math.random() * 4)*1)
//       var antenafeature= {
//         "type": "Feature",
//         "properties": {
//         "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
//         "timestamp": new Date()},
//         "geometry":nodo.geometry
        
//       }
//       if (nodo.properties.mobilegeneration=="2G"){
//              antenasFeatureCollection2G.features.push(antenafeature) 
//       }
//       if (nodo.properties.mobilegeneration=="3G"){
//         antenasFeatureCollection3G.features.push(antenafeature) 
//       }
//      if (nodo.properties.mobilegeneration=="4G"){
//        antenasFeatureCollection4G.features.push(antenafeature) 
//       }

//     })
//  const SOURCES2=jsonantenas.map((a,index)=>{  
//       //sources proveedores de enlaces   
      
//        return(
//          <Feature              
//               key={index} 
//               coordinates={a.geometry.coordinates}             
//               //onClick={this.markerClick.bind(this, {properties:nodo.properties,coordinates:nodo.geometry.coordinates})}
//       />    
//            )     
//      })
    var dev=
{"deviceId":"07F1A8206765346D6110F9A5C13E5A3A340DA011DDD986F97302A999D6A3CB52",
"serverPublicKey":"AAAAAAAAAAAAAAAAAAAAAMBGLKA2fVWLoP90ZeKpPAOeEH_ZSfrq78qG3hfA0HzOVgced8QEmz-dglxEjNYgD4MXMxsHGCbC1T3jqQ",
"serverPrivateKey":"AAAAAAAAAAAAAAAAAAAAABv3uHa2jWCZI8abVEzmOJrmk1BbYFtiamJNCTUq-7wLv930WZ5VvwQY0x6EtpRLEcGahBm4bHkT65BmgA",
"publicKey":"AAAAAAAAAAAAAAAAAAAAAEmfkY8kglquaWTnuAwp2_Vv0thAKtO-xZB_tM16DZnDBLzCwiQGxTK40UvrirvQSrkxq7JnI3vOoeNY",
"deviceTwinData":{
  "board":"ysl","brand":"xiaomi","carrierId":"9c1fc612-b92c-4701-ab78-edc89b3e4108",
  "country":"Estados Unidos","cpuSupportedAbis":"armeabi-v7a,armeabi","device":"ysl",
  "deviceId":"07F1A8206765346D6110F9A5C13E5A3A340DA011DDD986F97302A999D6A3CB52",
  "deviceType":"Xiaomi-Redmi S2","hardware":"qcom","manufacturer":"Xiaomi","mcc":"734","mnc":"4",
  "mobileEquipmentId":"868714032146034","model":"Redmi S2","product":"ysl","createdTimestamp":1563810378,"isDebugMode":false,
  "schemaVersion":12},
  "id":"168bc09c-8efc-4697-b411-3d647d586b99"}
  return (

    <React.Fragment>
        
        <div className={classes.root}>    
         
         <Container maxWidth="lg" className={classes.container}>  
    <Grid container spacing={4} justify="center">
    <Grid item xs={12} sm={6} md={4}>
               <Paper className={classes.paper2}><Dispositivo /></Paper>
    </Grid>
     <Grid item xs={12} sm={6} md={8}>
     <Map       
   //style="mapbox://styles/mapbox/streets-v8"
   style="mapbox://styles/mapbox/dark-v9"
   // style="mapbox://styles/mapbox/light-v9"
   center={[-66.87,10.471]} 
   //center={[longitude,latitude]} 
   zoom={[15]}
   //center={[state.position.longitude,state.position.latitude]} 
   //center={[state.position.latitude,state.position.longitude]} 
   // zoom={[zoom]}
   //onZoom={onZoom}
   onResize={onResize}
   containerStyle={mapStyle}        
   onControlClick={onControlClick}
   onZoomEnd={onZoomEnd}
   onClick={onClickMap}
//onClick={this._onClickMap}  
//<ZoomControl onControlClick={onControlClick}/>
// azulito #58D3F7  #FF00FF
> 
<ZoomControl  onControlClick={onZoom}/>
<ScaleControl />
<GeoJSONLayer
          data={CIUDADESGEO}
          fillPaint={{'fill-color': 'yellow','fill-outline-color': 'yellow','fill-opacity': .02}}
          linePaint={{            'line-color': 'yellow',            'line-width': .5          }}
          
        /> 
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
       {/* <Layer type="symbol" id="marker34" layout={{ 'icon-image': 'londonCycle' }} images={images}>
            {SOURCES2}
      </Layer> */}
      {/* <GeoJSONLayer 
          data={antenasFeatureCollection2G}
          circleLayout={{ visibility: 'visible' }}
          circlePaint={{'circle-color': '#3BB9FF','circle-radius': 6,'circle-opacity': 1,'circle-stroke-color': '#3BB9FF' , 'circle-stroke-width': 2,'circle-blur': 0.9, }}         
           
         
          />
      <GeoJSONLayer 
          data={antenasFeatureCollection3G}
          circleLayout={{ visibility: 'visible' }}
          circlePaint={{'circle-color': '#c77aff','circle-radius': 5,'circle-opacity': 1,'circle-stroke-color': '#c77aff' , 'circle-stroke-width': 1,'circle-blur': 0.9, }}         
           
         
          />
      <GeoJSONLayer 
          data={antenasFeatureCollection4G}
          circleLayout={{ visibility: 'visible' }}
          circlePaint={{'circle-color': '#990000','circle-radius': 3,'circle-opacity': 1,'circle-stroke-color': '#990000' , 'circle-stroke-width': 1,'circle-blur': 0.9, }}         
           
         
        /> */}
{/* <GeoJSONLayer
data={circle1}
circlePaint={{'circle-color': 'pink','circle-radius': .5, }}   
linePaint={{
  'line-color': 'yellow',
  'line-width': 2
}}

/>     */}
</Map>

    </Grid>
    
   <Grid item xs={12} sm={12} md={12}>
             <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>BaseStation</TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">Country</TableCell>

            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">CPU</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              
              <TableCell align="right">{row.model}</TableCell>
              <TableCell align="right">{row.cpu}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

             </Grid>
           </Grid>
    {/* <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">GEOBOUNDARIES</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          autoWidth={true}
    >

          <MenuItem value={'GRAN CARACAS'}>GRAN CARACAS</MenuItem>
          <MenuItem value={'ORIENTE'}>ORIENTE</MenuItem>
          <MenuItem value={'CENTRO OCCIDENTE'}>CENTRO OCCIDENTE</MenuItem>
          <MenuItem value={'OCCIDENTE'}>OCCIDENTE</MenuItem>
          <MenuItem value={'CENTRO'}>CENTRO</MenuItem>
          <MenuItem value={'ANDES'}>ANDES</MenuItem>
          <MenuItem value={'GUUAYANA'}>GUAYANA</MenuItem>
          <MenuItem value={'Andes'}>ANDES</MenuItem>
          <MenuItem value={'CENTRO LLANOS'}>CENTRO LLANOS</MenuItem>
          <MenuItem value={'Centro Occidente'}>CENTRO OCCIDENTE</MenuItem>
          <MenuItem value={'Occidente'}>Occidente</MenuItem>
          
          <MenuItem value={'Centro'}>Centro</MenuItem>
          <MenuItem value={'CENTRO LLANOS'}>CENTRO LLANOS</MenuItem>
          <MenuItem value={'CENTRO OCCIDENTE'}>CENTRO OCCIDENTE</MenuItem>

        </Select>
      </FormControl> */}
      </ Container>  
</div>
    </React.Fragment>
  );
}

