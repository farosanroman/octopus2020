import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';
import Chart from "react-apexcharts";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Histogram(props) {
  const classes = useStyles();
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
                  categories: ['10', '15', '50', '120', '49', '35', '20', '10', '2'  ],
                }
              }
            }
             
              height={140}
              series={
                [{
                    name: "Desktops",
                    data: [10, 15, 50, 120, 49, 35, 20, 10, 2]
                }]
            }
             

              type="bar"
              width={350}
            />
          </div>
     
    </React.Fragment>
  );
}