import React ,{useEffect,useState,useContext} from 'react';
//import { greatCircle, point ,randomPoint,voronoi} from '@turf/turf';

import KpiContext from '../../context/kpiContext'

import { makeStyles } from '@material-ui/core/styles';
import { greatCircle, point,hexGrid,circle,voronoi,randomPoint } from '@turf/turf';

import {useFetch} from '../hooks/usefetch'; 

import  MapGL,{Layer,Feature,ZoomControl,GeoJSONLayer,ScaleControl} from 'react-mapbox-gl';

import {useKpiGeoJson} from '../hooks/usekpigeojson'

import CircularProgress from '@material-ui/core/CircularProgress';
import {voronoigeojson} from '../../data/voronoigeojson.json';
import {voronoigeojson2} from '../../data/voronoigeojson2.json';

import {voronoigeojson3} from '../../data/voronoigeojson3.json';
import {antenas} from '../../data/antenas.json';

import {WORLD} from '../../data/WORLD.json';
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
  
 
  
 
// import { greatCircle, point } from '@turf/turf';

// console.log(greatCircle([0, 0], [100, 10]));
// console.log(point([100, 0]));

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
//console.log(greatCircle([0, 0], [100, 10]));//
//console.log(point([150, 0]));
var options = {
    //bbox : [-73,7,-62,12]
    //bbox: [-66.934,10.45114, -66.841, 10.511]
    bbox: [-67.3,9.985, -65.52, 10.5]
  };
 var points = randomPoint(4000, options);
 var pointFeatures = {
  "type": "FeatureCollection",
  "features": points};
//  alert(JSON.stringify(points))
 // var voronoiPolygons = voronoi(points, options);
//console.log(JSON.stringify(points))
var features0=[]
const f0=antenas.map(a=>{  
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
  

  
//console.log(JSON.stringify(features0))

   var voronoiPolygons0 = voronoi({
     "type": "FeatureCollection",
     "features": features0}, options);

     //console.log(JSON.stringify(voronoiPolygons0))

  //  var features=[]
  //    const f=voronoiPolygons0.features.map(f=>{  
  //     //sources proveedores de enlaces   
  //     if (f!=null){
  //      features.push( f
  //      )
  //     }})
  // var  voronoiPolygons=   {
  //   "type": "FeatureCollection",
  //   "features": features}

export default function Antenas() {
  const classes = useStyles();
  const contextKPI = useContext(KpiContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  //const[KPIcriterio,KPIcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson2([])
     
  const[KPIcriterio,KPIcant,KPI2Gcant,KPI3Gcant,KPI4Gcant,KPIRuta,KPI,KPI2G,KPI3G,KPI4G,handleKPIDay,handleKPICriterio,handleKPIFiltroDay]=useKpiGeoJson([])
    
  const [data, isLoading, isError , fetchData] = useFetch(""); 

  const [zoom, setZoom] = useState(16);
  const [center, setCenter] = useState([-66.8726,10.4713]);

  const [flagCircular, setFlagCircular] = React.useState(false);     

  var centro=[-66.867900,10.4671]
  var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
  var circle1 = circle(centro, .5, options);
  var circle2 = circle(centro, 1, options);
  var circle8 = circle(centro, 8, options);

  var bbox = [-66.807900,10.4071,-66.70,12.4071];
  //var bbox  = [-96,31,-84,40];
  var cellSide = 55;
  var options = {units: 'kilometers'};
  
  var hexgrid = hexGrid(bbox, cellSide, options);
  
  //const context=useContext(KpiContext)
    
  // useEffect(() => {
  //   console.log("VORONIIIIIIIIIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  //   console.log(JSON.stringify(contextKPI))
  //  }, [contextKPI]);
  useEffect(() => {
     //alert(JSON.stringify(contextKPI))
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
   // console.log(JSON.stringify(data))
   //alert("fetch"+JSON.stringify(data))
   
  handleKPIDay(data)
   setFlagCircular(false)
   
  }
},[data,isLoading]);
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

    <React.Fragment>
        
    <div className={classes.root}>

<Map       
   //style="mapbox://styles/mapbox/streets-v8"
   style="mapbox://styles/mapbox/dark-v9"
   // style="mapbox://styles/mapbox/light-v9"
   center={[-66.867900,10.4671]} 
   //center={[longitude,latitude]} 
   zoom={[10]}
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
// azulito #58D3F7  #FF00FF
> 
<ZoomControl  onControlClick={onZoom}/>
<ScaleControl />
<Layer type="symbol" id="marker34" layout={{ 'icon-image': 'londonCycle' }} images={images}>
            {SOURCES}
      </Layer>
      <GeoJSONLayer
          data={CIUDADESGEO}
          fillPaint={{'fill-color': 'yellow','fill-outline-color': 'yellow','fill-opacity': .1}}
          linePaint={{            'line-color': 'yellow',            'line-width': 1          }}
          
        /> 
      {/* <GeoJSONLayer   
          data={points}
          circleLayout={{ visibility: 'visible' }}
         circlePaint={{'circle-color': 'red','circle-radius': 2,'circle-opacity': 1,'circle-stroke-color': 'Orange' , 'circle-stroke-width': 2,'circle-blur': 0.9, }}         
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
            {/* <GeoJSONLayer
          data={voronoigeojson}
          fillPaint={{'fill-color': 'Orange','fill-outline-color': 'white','fill-opacity':.3}}
          linePaint={{
            'line-color': '#9F81F7',
            'line-width': 4
          }}
          
        />   
                    <GeoJSONLayer
          data={voronoigeojson2}
          fillPaint={{'fill-color': 'red','fill-outline-color': 'white','fill-opacity':.3}}
          linePaint={{
            'line-color': '#9F81F7',
            'line-width': 4
          }}
          
        />   
                       <GeoJSONLayer
          data={voronoigeojson3}
          fillPaint={{'fill-color': 'blue','fill-outline-color': 'white','fill-opacity':.3}}
          linePaint={{
            'line-color': '#9F81F7',
            'line-width': 4
          }}
          
        />  */}
         {/* <GeoJSONLayer
          data={WORLD}
          fillPaint={{'fill-color': 'gray','fill-outline-color': 'white','fill-opacity': 0.005}}
          linePaint={{
            'line-color': '#58D3F7',
            'line-width': 1
          }} */}
          
        />     
{/* 
      <GeoJSONLayer
          data={PAMIRANDA}
          fillPaint={{'fill-color': 'gray','fill-outline-color': 'white','fill-opacity': 0.005}}
          linePaint={{
            'line-color': '#9F81F7',
            'line-width': 4
          }}
          
        />   
         <GeoJSONLayer
          data={LIBERTADOR}
          fillPaint={{'fill-color': 'gray','fill-outline-color': 'white','fill-opacity': 0.005}}
          linePaint={{
            'line-color': '#9F81F7',
            'line-width': 4
          }} */}
          
          
 {/* <GeoJSONLayer
          data={circle1}
          circlePaint={{'circle-color': 'pink','circle-radius': .5, }}   
          linePaint={{
            'line-color': 'yellow',
            'line-width': 4
          }}
          
        />    
         <GeoJSONLayer
          data={circle2}
          circlePaint={{'circle-color': 'pink','circle-radius': .5, }}   
          linePaint={{
            'line-color': 'yellow',
            'line-width': 4
          }}
          
        />     */}
{/* <GeoJSONLayer
          data={hexgrid}
          fillPaint={{'fill-color': 'gray','fill-outline-color': 'white','fill-opacity': 0.005}}
          linePaint={{
            'line-color': '#00BFFF',
            'line-width': 4
          }}
          
        />    */}
          <GeoJSONLayer   
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
          
        
   <GeoJSONLayer   
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
           <GeoJSONLayer   
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
</Map>
</div>
    </React.Fragment>
  );
}