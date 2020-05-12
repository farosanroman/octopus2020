import React ,{useEffect,useState,useContext} from 'react';
//import { greatCircle, point ,randomPoint,voronoi} from '@turf/turf';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import KpiContext from '../../context/kpiContext'

import { makeStyles } from '@material-ui/core/styles';
import { greatCircle, point,hexGrid,circle,voronoi,randomPoint } from '@turf/turf';

import {useFetch} from '../hooks/usefetch'; 

import  MapGL,{Layer,Feature,ZoomControl,GeoJSONLayer,ScaleControl} from 'react-mapbox-gl';

import {useKpiGeoJson} from '../hooks/usekpigeojson'

import CircularProgress from '@material-ui/core/CircularProgress';
import {voronoigeojson} from '../../data/voronoigeojson.json';
import {voronoiguarenas} from '../../data/voronoiguarenas.json';
import {voronoiteques} from '../../data/voronoiteques.json';
import {voronoivargas} from '../../data/voronoivargas.json';

import {antenas} from '../../data/antenas.json';
import {jsonantenas} from '../../data/jsonantenas.json';

//import {WORLD} from '../../data/WORLD.json';
import {PAMIRANDA} from '../../data/PAMIRANDA.json';
import {LIBERTADOR} from '../../data/libertador.json';
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

  
var features0=[]
const f0=antenas.map(a=>{  
//  const f0=points.map(a=>{ 
  //sources proveedores de enlaces   
 // if ((a.lat>10.43114)&&(a.lat<10.52)&&(a.lon<-66.934)&&(a.lon>-66.805)){
   // console.log("<<<<")
   features0.push(    {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [
        a.lon,
        a.lat
      ]
    }} 
   )
//  }
})
var optionsA = {
 // bbox : [-66.65,10.44,-66.5,10.48]
  //bbox: [-66.934,10.45114, -66.841, 10.511]
  bbox: [-67.3,9.985, -65.52, 10.5]//antenas
};
   var voronoiPolygons0 = voronoi({
     "type": "FeatureCollection",
     "features": features0}, optionsA);

export default function GeoBoundaries() {
  const classes = useStyles();
  const contextKPI = useContext(KpiContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  //const[KPIcriterio,KPIcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson2([])
     
  //const[KPIcriterio,KPIcant,KPI2Gcant,KPI3Gcant,KPI4Gcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson([])
    
  const [data, isLoading, isError , fetchData] = useFetch(""); 
  const [dataCircle, isLoadingCircle, isErrorCircle , fetchDataCircle] = useFetch(""); 
  const [circle1, setCircle1] = useState({"type":"FeatureCollection","features":[] });
  const[clicklocation, setClickLocation]=useState([0,0])
  const [zoom, setZoom] = useState(16);
  const [center, setCenter] = useState([-66.8726,10.4713]);
  const [rows, setRows] = useState([]);
  const [region, setRegion] = useState("GRAN CARACAS");
  const [antenasimages, setAntenasImages] = useState([]);
  const [antenas2G, setAntenas2G] = useState({"type":"FeatureCollection","features":[] });
  const [antenas3G, setAntenas3G] = useState({"type":"FeatureCollection","features":[] });
  const [antenas4G, setAntenas4G] = useState({"type":"FeatureCollection","features":[] });
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
  //const [age, setAge] = React.useState('');
  
  var hexgrid = hexGrid(bbox, cellSide, options);
  const handleChange = (event) => {
    setRegion(event.target.value);
  };
  useEffect(() => {
  fetchData('https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD&tsyms=USD,EUR,COP,VES,ARS,PEN,PAB,BRL,BOB,BTC');
     
 },[region]);
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
   //alert("fetch"+JSON.stringify(data))
   
  // handleKPIDay(data)
    setFlagCircular(false)
   
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
  fetchDataCircle('https://octopustestingfunctions.azurewebsites.net/api/GetKPIDay?code=ophd6G5J32nZT0jZHMoDXr7FEHoRMiQFa876XZ35TpWkmjIBJziHZw==&id=2020-06-05');
  
   },[clicklocation]);
 
 useEffect(() => {
  //alert("in "+option)
 //alert(JSON.stringify(data))
  if (isLoadingCircle) {
    setFlagCircular(true)
  }
  //alert(data[0].type)
  if ((dataCircle!=undefined)&&(!isLoadingCircle))      
  {
   // console.log(JSON.stringify(data))
  //alert("fetch"+JSON.stringify(dataCircle))
   if (JSON.stringify(dataCircle)!="[]"){
  //  alert("fetch"+JSON.stringify(dataCircle))
   const rows = [
    createData('16002','Av Libertador', '3G','LTE',55),
    createData('16002','Av Libertador', '3G','LTE',55),
    createData('16002','Av Libertador', '3G','LTE',55),
    createData('16002','Av Libertador', '3G','LTE',55),
    createData('16002','Av Libertador', '3G','LTE',55),
    createData('16002','Av Libertador', '3G','LTE',55),
    createData('16002','Av Libertador', '3G','LTE',55),
    createData('16002','Av Libertador', '3G','LTE',55),
 
  ];
setRows(rows)
}
  
  // handleKPIDay(data)
  //  setFlagCircular(false)
   
  }
},[dataCircle,isLoadingCircle]);

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
    useEffect(() => {
      // alert("ANTENAS   "+JSON.stringify(pointFeatureCollection.features))
      var SOURCES3=[]
      var antenasxregion=[];
      //console.log("FILTRO")
      //alert(region)
      jsonantenas.map((a,index)=>{
        if (a.properties.region==region){
         // console.log(a)
          antenasxregion.push(a)

        }
       })
      antenasxregion.map((ant,index)=>{  
       //ources proveedores de enlaces   
       if (ant.properties.region==region){
        SOURCES3.push(  <Feature              
         key={index} 
         coordinates={ant.geometry.coordinates}             
         //onClick={this.markerClick.bind(this, {properties:nodo.properties,coordinates:nodo.geometry.coordinates})}
           />)
        }
       //   return(
       //    <Feature              
       //         key={index} 
       //         coordinates={a.geometry.coordinates}             
       //         //onClick={this.markerClick.bind(this, {properties:nodo.properties,coordinates:nodo.geometry.coordinates})}
       // />    
       //      )     
        //}
           })
      setAntenasImages(SOURCES3)
      var antenasFeatureCollection2G={"type":"FeatureCollection","features":[] }
      var antenasFeatureCollection3G={"type":"FeatureCollection","features":[] }
      var antenasFeatureCollection4G={"type":"FeatureCollection","features":[] }
      
      const A=antenasxregion.map((nodo,index)=>{  

        //sources proveedores de enlaces   
       //console.log(Math.floor(Math.random() * 4)*1)
       if (nodo.properties.region==region){
       var antenafeature= {
         "type": "Feature",
         "properties": {
         "id": "81150cc3-25fa-4f98-b36d-4103e9de00e7",
         "timestamp": new Date()},
         "geometry":nodo.geometry
         
       }
       if (nodo.properties.mobilegeneration=="2G"){
              antenasFeatureCollection2G.features.push(antenafeature) 
       }
       if (nodo.properties.mobilegeneration=="3G"){
         antenasFeatureCollection3G.features.push(antenafeature) 
       }
      if (nodo.properties.mobilegeneration=="4G"){
        antenasFeatureCollection4G.features.push(antenafeature) 
       }
     }
     }) 
     setAntenas2G(antenasFeatureCollection2G)
     setAntenas3G(antenasFeatureCollection3G)
     setAntenas4G(antenasFeatureCollection4G)

    },[region]);
     
    function createData(id,  sectorname,generation,technology,orientacion) {
      return { id,  sectorname,generation,technology,orientacion};
    }
    
  return (

    <React.Fragment>
        
    <div className={classes.root}>
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">GEOBOUNDARIES</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={region}
          onChange={handleChange}
          autoWidth={true}
    >
        
          <MenuItem value={'GRAN CARACAS'}>GRAN CARACAS</MenuItem>
          <MenuItem value={'ORIENTE'}>ORIENTE</MenuItem>
          <MenuItem value={'CENTRO OCCIDENTE'}>CENTRO OCCIDENTE</MenuItem>
          <MenuItem value={'OCCIDENTE'}>OCCIDENTE</MenuItem>
          <MenuItem value={'CENTRO'}>CENTRO</MenuItem>
          <MenuItem value={'ANDES'}>ANDES</MenuItem>
          <MenuItem value={'GUAYANA'}>GUAYANA</MenuItem>
          <MenuItem value={'Andes'}>ANDES</MenuItem>
          <MenuItem value={'CENTRO LLANOS'}>CENTRO LLANOS</MenuItem>
          <MenuItem value={'Centro Occidente'}>CENTRO OCCIDENTE</MenuItem>
          <MenuItem value={'Occidente'}>Occidente</MenuItem>
          
          <MenuItem value={'Centro'}>Centro</MenuItem>
          <MenuItem value={'CENTRO LLANOS'}>CENTRO LLANOS</MenuItem>
          <MenuItem value={'CENTRO OCCIDENTE'}>CENTRO OCCIDENTE</MenuItem>

        </Select>
      </FormControl>
      {flagCircular&&<CircularProgress variant="indeterminate"   disableShrink  size={17}   thickness={4} className={classes.progress}  color="secondary" />}
<Map       
   //style="mapbox://styles/mapbox/streets-v8"
   style="mapbox://styles/mapbox/dark-v9"
   // style="mapbox://styles/mapbox/light-v9"
   center={[-66.867900,10.4671]} 
   //center={[longitude,latitude]} 
   zoom={[6]}
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
<Layer type="symbol" id="marker34" layout={{ 'icon-image': 'londonCycle' }} images={images}>
            {antenasimages}
      </Layer>
      <GeoJSONLayer 
          data={antenas2G}
          circleLayout={{ visibility: 'visible' }}
          circlePaint={{'circle-color': '#3BB9FF','circle-radius': 6,'circle-opacity': 1,'circle-stroke-color': '#3BB9FF' , 'circle-stroke-width': 2,'circle-blur': 0.9, }}         
           
         
          />
      <GeoJSONLayer 
          data={antenas3G}
          circleLayout={{ visibility: 'visible' }}
          circlePaint={{'circle-color': '#c77aff','circle-radius': 5,'circle-opacity': 1,'circle-stroke-color': '#c77aff' , 'circle-stroke-width': 1,'circle-blur': 0.9, }}         
           
         
          />
      <GeoJSONLayer 
          data={antenas4G}
          circleLayout={{ visibility: 'visible' }}
          circlePaint={{'circle-color': '#990000','circle-radius': 3,'circle-opacity': 1,'circle-stroke-color': '#990000' , 'circle-stroke-width': 1,'circle-blur': 0.9, }}         
           
         
        />
<GeoJSONLayer
data={circle1}
circlePaint={{'circle-color': 'pink','circle-radius': .5, }}   
linePaint={{
  'line-color': 'yellow',
  'line-width': 2
}}

/>    
</Map>
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>BaseStation</TableCell>
            <TableCell align="right">Sector</TableCell>
            <TableCell align="right">generation</TableCell>
            <TableCell align="right">technology</TableCell>

            <TableCell align="right">Orientacion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.sectorname}</TableCell>
              <TableCell align="right">{row.generation}</TableCell>
              <TableCell align="right">{row.technology}</TableCell>
              
              <TableCell align="right">{row.orientacion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>
    </React.Fragment>
  );
}