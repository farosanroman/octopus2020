import React ,{useEffect,useState}from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../layout/title';
import Chart from "react-apexcharts";
import {kpijson} from '../../data/kpijson.json';
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function HeatMap(props) {
  const [categorias, setCategorias] = useState([100,200,300,400,500,600]);
  const [data, setData] = useState([400, 430, 448, 470, 540, 580]);
  const classes = useStyles();
  useEffect(() => {
    //alert("histograma props.kkppii"+JSON.stringify(props.kkppii) )
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
                },
                plotOptions: {
                  heatmap: {
                    shadeIntensity: 0.5,
                
                    colorScale: {
                      ranges: [{
                          from: 0,
                          to: 25,
                          name: 'bajo',
                          color: '#FF0000'
                        },
                        {
                          from: 26,
                          to: 50,
                          name: 'mediano',
                          color: '#FFB200'
                        },
                        {
                          from: 51,
                          to: 75,
                          name: 'bueno',
                          color: '#128FD9'
                        },
                        {
                          from: 76,
                          to: 100,
                          name: 'excelente',
                          color: '#50D050'
                        }
                      ]
                    }
                  }
                },
                dataLabels: {
                  enabled: false
                },
                title: {
                  text: 'Mapa de Color de Antenas'
                }
                ,
                xaxis: {
                    categories: ['ANT1','ANT2','ANT3','ANT4','ANT5','ANT6','ANT7','ANT8','ANT9','ANT10','ANT11','ANT12','ANT13','ANT14','ANT15','ANT16','ANT17','ANT18','ANT19','ANT20'
                    ],
                  },
  }}
  height={400}
  series={
    [
        {
        name: "Disponibilidad",
        data: [20,30,60,80,33,20,30,60,80,33,20,30,60,80,33,20,30,60,80,33]
    }
,
{
    name: "Intensidad",
    data: [13,22,33,65,28,13,22,33,65,28,13,22,33,65,28,13,22,33,65,28]
}
,
{
    name: "rtt",
    data: [20,30,60,80,33,20,30,60,80,33,20,30,60,80,33,20,30,60,80,33]
},
{
    name: "downlink",
    data: [20,30,60,80,33,20,30,60,80,33,20,30,60,80,33,20,30,60,80,33]
}
,
{
    name: "Bateria",
    data: [13,22,33,65,28,13,22,33,65,28,13,22,33,65,28,13,22,33,65,28]
}
]
}

  type="heatmap"

             />
            
          </div>
     
    </React.Fragment>
  );
}