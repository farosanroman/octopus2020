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

export default function Histogram(props) {
  const [categorias, setCategorias] = useState([]);
  const [data, setData] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    //alert("histograma props.kkppii"+JSON.stringify(props.kkppii) )
    var KKPPII=props.kkppii
    var rtt=[]
    var delta=100
    var rango=delta;
    
    for (var j= 0; j <10; j++) {
    rtt.push({rango:rango,cant:0})
    rango+=delta
    }
    for (var j= 0; j <KKPPII.features.length; j++) {
      for (var i= 0; i <rtt.length; i++) {
         if ((KKPPII.features[j].properties.rtt<rtt[i].rango)&&(KKPPII.features[j].properties.rtt>(rtt[i].rango)-delta)){
           rtt[i].cant+=1
    
         }
      }
    }
    var categorias=[]
    var data=[]
    for (var i= 0; i <rtt.length; i++) {
       categorias.push(rtt[i].rango)
       data.push(rtt[i].cant)
    }
    setCategorias(categorias)
    setData(data)
    console.log(JSON.stringify(rtt))
     },[props.kkppii]);
  return (
    <React.Fragment>
      <Title>{props.titulo}</Title>
      <div className="col percentage-chart">
            <Chart
             options={ {
                chart: {
                  type: 'bar',
                  height: 450
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                  }
                },
                dataLabels: {
                  enabled: false
                },
                xaxis: {
                  categories: categorias,
                }
              }
            }
             
              height={140}
              series={
                [{
                    name: "Desktops",
                    data: data
                }]
            }
             

              type="bar"

            />
          </div>
     
    </React.Fragment>
  );
}