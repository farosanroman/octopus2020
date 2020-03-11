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

export default function BarStack(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.titulo}</Title>
      <div className="col percentage-chart">
            <Chart
              options={
                {
                    chart: {
                      stacked: true,
                      stackType: "100%",
                      toolbar: {
                        show: false
                      }
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true,
                        barHeight: '90%',
                      }
                    },
                    dataLabels: {
                      dropShadow: {
                        enabled: false
                      }
                    },
                    stroke: {
                      width: 2
                    },
                    xaxis: {
                      categories: ['2G', '3G', '4G' ],
                      labels: {
                        show: false
                      },
                      axisBorder: {
                        show: false
                      },
                      axisTicks: {
                        show: false
                      }
                    },
                    // fill: {
                    //   opacity: 1,
                    //   type: "gradient",
                    //   gradient: {
                    //     shade: "dark",
                    //     type: "vertical",
                    //     shadeIntensity: 0.35,
                    //     gradientToColors: undefined,
                    //     inverseColors: false,
                    //     opacityFrom: 0.85,
                    //     opacityTo: 0.85,
                    //     stops: [90, 0, 100]
                    //   }
                    // },
            
                    legend: {
                      position: "bottom",
                      horizontalAlign: "right"
                    }
                  }

              }
              height={140}
              series={
                [
                    {
                      name: "HSDPA",
                      data: [32,2,3]
                    },
                    {
                      name: "HSPA",
                      data: [41,34,4]
                    },
                    {
                      name: "HSPAP",
                      data: [12,3.45]
                    },
                    {
                      name: "LTE",
                      data: [65,2,56]
                    }
                  ]
              }

              type="bar"
              width={350}
            />
          </div>
     
    </React.Fragment>
  );
}