import React,{useEffect,useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../layout/title';
import Chart from "react-apexcharts";
import Moment from 'react-moment';
import {kpijson} from '../../data/kpijson.json';
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});
  
 
    
    //}
  //alert(kpijson.features.length)
//  var horas=[{"hora":3,"cant":3},{"hora":4,"cant":13},{"hora":7,"cant":18},{"hora":8,"cant":45},{"hora":12,"cant":46},{"hora":13,"cant":48},{"hora":14,"cant":50},{"hora":15,"cant":67},{"hora":16,"cant":136},{"hora":17,"cant":210}]
export default function GeoDispositivos(props) {
  const classes = useStyles();
  const [series, setSeries] = useState([
       {
           name: "Android 000",
           data: [{ x: '01/06/2020', y: 34 }, { x: '03/08/2020', y: 25 } , { x: '04/01/2020', y: 38 }]
         },]);
  const [desde, setDesde] = useState(new Date().getTime());
  const [hasta, setHasta] = useState(new Date().getTime()+86400000*5);
  const [optionss, setOptionss] = useState();
  
  const [KPI, setKPI] = useState({"type":"FeatureCollection","features":[] });
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      height: 300,
      foreColor: "#999",
      stacked: true}});
 
  //setKPI(props.ppkkii)
  //alert("GeoDispositivos "+JSON.stringify(props.kkppii))
  
  useEffect(() => {
 //alert("props.kkppii"+JSON.stringify(props.kkppii) )
// setKPI(props.kkppii)

var oo={
  chart: {
    type: "area",
    height: 300,
    foreColor: "#999",
    stacked: true,
    dropShadow: {
      enabled: true,
      enabledSeries: [0],
      top: -2,
      left: 2,
      blur: 5,
      opacity: 0.06
    }
  },
  stroke: {
    curve: "smooth",
    width: 3
  },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      strokeColor: "#fff",
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100]
        },
    },
    
    yaxis: {
      labels: {
          style: {
              colors: '#8e8da4',
          },
          offsetX: 0,
          // formatter: function(val) {
          //   return (val / 1000000).toFixed(2);
          // },
      },
      
      tooltip: {
        enabled: true
      },
      axisBorder: {
          show: false,
      },
      axisTicks: {
          show: true
      }
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 1,
      min: desde,
      max: hasta,
      axisTicks: {
        show: true
      },
    //    labels: {
    //        rotate: -15,
    //        rotateAlways: true,
    //        formatter: function(val, timestamp) {
    //          return moment(new Date(timestamp)).format("DD MMM YYYY")
    //      }
    //    }
    },
    // title: {
    //   text: 'Irregular Data in Time Series',
    //   align: 'left',
    //   offsetX: 14
    // },
    tooltip: {
      shared: true
    },
    tooltip: {
      x: {
        format: "hh:mm"
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: -10
    }
  }
  //setOptions(oo)
  },[]);
  useEffect(() => {
    console.log("KPI KPI KPI")
    var KKPPII=props.kkppii
      
    if (KKPPII.features.length>0){
     // alert(KKPPII.features[0].properties.timestamp.getHours())
    
      // alert(KKPPII.features.length)
      console.log(JSON.stringify(KKPPII.features))
      //alert(JSON.stringify(KKPPII.features[0].timestamp))
      //alert(JSON.stringify(KKPPII.features[0].properties.timestamp).substr(12,2)*1)
      
      var curvas=[]    
    // alert(kpijson.features[0].properties.timestamp.substr(11,2)*1)    
     //for (var i= 0; i < 24; i++) {
       console.log("geodispositivos")
       console.log(KKPPII)
     var cant=0;
    // alert(JSON.stringify(KKPPII.features[0].properties.timestamp))
    // alert(JSON.stringify(KKPPII.features[0].properties.timestamp.getHours))
     var dateANT = new Date(KKPPII.features[0].properties.timestamp);
     //alert(date.getHours())
       var horaANT=dateANT.getHours()
       for (var j= 0; j <KKPPII.features.length; j++) {
         cant+=1
         var dateACT = new Date(KKPPII.features[j].properties.timestamp);
         
         if (horaANT!=dateACT.getHours()){  
           
         curvas.push({hora:horaANT,cant:cant})
         horaANT=dateACT.getHours()
       }
       }
      // console.log("CURVAS")
       console.log(JSON.stringify(curvas))
  
           var data=[]
     //    var fecha=new Date("03/20/2020").getTime()
       // alert(props.fecha)
         var fecha=new Date(props.fecha).getTime()-60*60*4
     
         for (var i = 0; i < curvas.length; i++) {
           var f=fecha+3600000*curvas[i].hora
           data.push({ x: f, y: curvas[i].cant });
           
         }
         console.log(JSON.stringify(data))
  
         var sss=[
           {
             name: "Android 000",
             data: data
           }
         ] 
    setSeries(sss)
        }
  

 },[props.kkppii]);
  return (
    <React.Fragment>
      <Title>{props.titulo}</Title>
            <Chart
              options={options}
              height={200}
             
              series={series}
              type="area"
              
            />
     
    </React.Fragment>
  );
}

//https://apexcharts.com/docs/chart-types/area-chart/

//https://codepen.io/apexcharts/pen/QrbEQg

// var s=                [
//   {
//       name: "Android 000",
//       data: [{ x: '01/06/2020', y: 34 }, { x: '03/08/2020', y: 25 } , { x: '04/01/2020', y: 38 }]
//     },
//   {
//     name: "Android XYZ",
//     data: [{ x: '01/06/2020', y: 54 }, { x: '03/08/2020', y: 17 } , { x: '04/28/2020', y: 26 }]
//   },
//   {
//       name: "Android 123",
//       data: [{ x: '02/06/2020', y: 24 }, { x: '04/10/2020', y: 7 } , { x: '05/30/2020', y: 6 }]
//     }
// ]
