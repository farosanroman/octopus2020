import React ,{useEffect,useState}from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../layout/title';
import Chart from "react-apexcharts";
import {kpijson} from '../../data/kpijson.json';

import {antenas} from '../../data/antenas.json';
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function HeatMap(props) {
  const [categorias, setCategorias] = useState([100,200,300,400,500,600]);
  const [data, setData] = useState([400, 430, 448, 470, 540, 580]);
  const [disponibilidad, setDisponibilidad] = useState([400, 430, 448, 470, 540, 580]);
  const [rtt, setRtt] = useState([400, 430, 448, 470, 540, 580]);
  const [downlink, setDownlink] = useState([400, 430, 448, 470, 540, 580]);
  const [batery, setBatery] = useState([400, 430, 448, 470, 540, 580]);

  const classes = useStyles();
  useEffect(() => {
  var  cat=[];
  var disp=[]
  var down=[]
  var bat=[]
  var r=[]
  antenas.map((a, i) => {
    if (i<100){
      cat.push(a.cellid)
       disp.push(1+Math.floor(Math.random() * 100)*1)
       r.push(1+Math.floor(Math.random() * 100)*1)
       bat.push(1+Math.floor(Math.random() * 100)*1)
       down.push(1+Math.floor(Math.random() * 100)*1) 
      
      }
  })
  setCategorias(cat)
  setDisponibilidad(disp)
  setDownlink(down)
  setBatery(bat)
  setRtt(r)
     },[]);
  return (
    <React.Fragment>
      <Title>{props.titulo}</Title>
      <div className="col percentage-chart">
             <Chart
               options={{
                chart: {
                  height: 600,
                  type: 'heatmap',
                  foreColor: "#fff",
                },
                plotOptions: {
                  heatmap: {
                    shadeIntensity: 0.5,
                
                    colorScale: {
                      ranges: [{
                          from: 0,
                          to: 25,
                          name: 'bad',
                          color: '#FF0000'
                        },
                        {
                          from: 26,
                          to: 50,
                          name: 'regular',
                          color: '#FFB200'
                        },
                        {
                          from: 51,
                          to: 75,
                          name: 'good',
                          color: '#128FD9'
                        },
                        {
                          from: 76,
                          to: 100,
                          name: 'excelent',
                          color: '#50D050'
                        }
                      ]
                    }
                  }
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: 0
                },
                title: {
                  text: 'Mapa de Color de Antenas'
                }
                ,
                xaxis: {
                    categories: categorias,
                  },
  }}
  height={400}
  series={
    [
//         {
//         name: "Disponibilidad",
//         data: [20,30,60,80,33,20,30,60,80,33,20,30,60,80,33,20,30,60,80,33]
//     }
// ,
{
    name: "batery",
    data: batery
}
,
{
    name: "rtt",
    data: rtt
},
{
    name: "downlink",
    data:downlink
}
,
{
    name: "Avalilability",
    data: disponibilidad
}
]
}

  type="heatmap"

             />
            
          </div>
     
    </React.Fragment>
  );
}