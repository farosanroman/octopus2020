import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../layout/title';
import Chart from "react-apexcharts";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});
  var oo=
  {
    chart: {
        type: 'bar',
        height: 350,
        foreColor: "#fff",
      },
          plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['G2', 'G3', 'G4' ],
      },
      colors: [ '#3BB9FF','#B041FF', '#990000', '#000080'],
      };
 
      var ss=
      [{
        data: [400, 430, 448]
      }]
      
     var  sss=
        [
            {
              name: "G2",
              data: [32]
            },
            {
              name: "G3",
              data: [41]
            },
            {
              name: "G4",
              data: [12]
            },
          ]
      
export default function BarStack(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.titulo}</Title>
      <div className="col percentage-chart">
            <Chart
            
              options={oo}
              height={150}
              series={sss}
              type="bar"
             
            />
          </div>
     
    </React.Fragment>
  );
}