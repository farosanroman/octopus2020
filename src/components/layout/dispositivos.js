import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';
import Chart from "react-apexcharts";
import Moment from 'react-moment';
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});
var o=          {
    chart: {
      type: 'area',
      stacked: false,
      height: 450,
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
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
          formatter: function(val) {
            return (val / 1000000).toFixed(2);
          },
      },
      axisBorder: {
          show: false,
      },
      axisTicks: {
          show: false
      }
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 8,
      min: new Date("01/01/2020").getTime(),
      max: new Date("06/01/2020").getTime(),
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
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: -10
    }
  }
var s=                [
    {
        name: "Android 000",
        data: [{ x: '01/06/2020', y: 34 }, { x: '03/08/2020', y: 25 } , { x: '04/01/2020', y: 38 }]
      },
    {
      name: "Android XYZ",
      data: [{ x: '01/06/2020', y: 54 }, { x: '03/08/2020', y: 17 } , { x: '04/28/2020', y: 26 }]
    },
    {
        name: "Android 123",
        data: [{ x: '02/06/2020', y: 24 }, { x: '04/10/2020', y: 7 } , { x: '05/30/2020', y: 6 }]
      }
  ]

export default function Dispositivos(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.titulo}</Title>
            <Chart
              options={o}
              height={200}
             
              series={s}
              type="area"
              width={350}
            />
     
    </React.Fragment>
  );
}