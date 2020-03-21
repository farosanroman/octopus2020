import React ,{useEffect} from 'react';
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
                      },
                      foreColor: "#fff",
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true
                      }
                    },
                    dataLabels: {
                      dropShadow: {
                        enabled: false
                      }
                    },
                    stroke: {
                      width: 0
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
                      },
                      colors: [ '#3BB9FF','#B041FF', '#990000', '#000080','#FF0000','#FF4500','#FF00FF','#D2691E'],
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
              height={120}
              // series= {               [
              //   {
              //     name: "HSPA",
              //     data: [0,6044,1]
              //   },
              //   {
              //     name: "HSPAP",
              //     data: [27,14523,0]
              //   },
              //   {
              //     name: "UMTS",
              //     data: [0,50,0]
              //   },
              //   {
              //     name: "LTE",
              //     data: [0,2,10648]
              //   },
              //   {
              //     name: "HSUPA",
              //     data: [0,12,1]
              //   }
              //   ,
              //   {
              //     name: "UNKNOWN",
              //     data: [4,6,0]
              //   }
              //   ,
              //   {
              //     name: "EDGE",
              //     data: [19,0,0]
              //   }
              //   ,
              //   {
              //     name: "HSDPA",
              //     data: [0,2,0]
              //   }
              // ]}
              series={
                [
                    {
                      name: "HSDPA",
                      data: [32,2]
                    },
                    {
                      name: "HSPA",
                      data: [41,34]
                    },
                    {
                      name: "HSPAP",
                      data: [12,3]
                    },
                    {
                      name: "LTE",
                      data: [65,2]
                    }
                  ]
              }

              type="bar"
              
            />
          </div>
     
    </React.Fragment>
  );
}