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
var s= [
    {
      name: "blue",
      data: [32]
    },
    {
      name: "green",
      data: [41]
    },
    {
      name: "yellow",
      data: [12]
    },
    {
      name: "red",
      data: [65]
    }
  ]
var o=
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
var options = {
    series: [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
      'United States', 'China', 'Germany'
    ],
  }
  };
  var oo=
  {
    chart: {
        type: 'bar',
        height: 350
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
        categories: ['2G', '3G', '4G'
        ],
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
              name: "2G",
              data: [32]
            },
            {
              name: "3G",
              data: [41]
            },
            {
              name: "4G",
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
              width={500}
            />
          </div>
     
    </React.Fragment>
  );
}