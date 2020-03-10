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
                        horizontal: true
                      }
                    },
                    dataLabels: {
                      dropShadow: {
                        enabled: true
                      }
                    },
                    stroke: {
                      width: 0
                    },
                    xaxis: {
                      categories: ["Fav Color"],
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
                    fill: {
                      opacity: 1,
                      type: "gradient",
                      gradient: {
                        shade: "dark",
                        type: "vertical",
                        shadeIntensity: 0.35,
                        gradientToColors: undefined,
                        inverseColors: false,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [90, 0, 100]
                      }
                    },
            
                    legend: {
                      position: "bottom",
                      horizontalAlign: "right"
                    }
                  }

              }
              height={120}
              series={
                [
                    {
                      name: "HSDPA",
                      data: [32]
                    },
                    {
                      name: "HSPA",
                      data: [41]
                    },
                    {
                      name: "HSPAP",
                      data: [12]
                    },
                    {
                      name: "LTE",
                      data: [65]
                    }
                  ]
              }

              type="bar"
              width={400}
            />
          </div>
     
    </React.Fragment>
  );
}