import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../layout/title';
import Chart from "react-apexcharts";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  paper: {
  	maxHeight: 90,
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#06171E'
   
  },
  chart: {
  	marginTop: theme.spacing(4),
  }
}));

var optionsProgress = {};

var series = [];

export default function ProgressBar(props) {
  const classes = useStyles();
  const [progressBarState, setProgressBarState] = useState(props);

  return (
    <React.Fragment>
     	<Title>{progressBarState.titulo}</Title>
      	<div className={classes.chart}>
      	{
      		progressBarState.data.map((item, key) => {
      			console.log(item);
      			optionsProgress = {
				  chart: {
				    height: 70,
				    type: 'bar',
				    stacked: true,
				    sparkline: {
				      enabled: true
				    }
				  },
				  plotOptions: {
				    bar: {
				      horizontal: true,
				      barHeight: '20%',
				      colors: {
        				backgroundBarColors: ['#030E13']
      				  }	
				    },
				  },
				  colors: ['#00ABD7'],
				  stroke: {
				    width: 0,
				  },
				  title: {
				    floating: true,
				    offsetX: -10,
				    offsetY: 5,
				    text: item.name,
				    style: {
				      fontSize: '16px',
				      fontFamily: 'Montserrat',
					  fontStyle: 'normal',
					  fontWeight: 'normal',
					  color:  '#FFFFFF'
				    }
				  },
				  subtitle: {
				    floating: true,
				    align: 'right',
				    offsetY: 0,
				    text: `${item.value}`,
				    style: {
				      fontSize: '16px',
				      fontFamily: 'Montserrat',
					  fontStyle: 'normal',
					  fontWeight: 'bold',
					  color:  '#FFFFFF'
				    }
				  },
				  tooltip: {
				    enabled: false
				  },
				  xaxis: {
				    categories: [item.name],
				  },
				  yaxis: {
				  	max: progressBarState.max
				  }
				};
      			series = [{
      				name: item.name,
      				data: [item.value]
      			}];

      			return (
      			  	<Paper elevation={0} className={classes.paper} key={key}>
      					<Chart
      					options={optionsProgress}
		              	height={70}
		              	series={series}
		              	type="bar"/>
      				</Paper>
      			)
      		})
      	}
      	</div>
    </React.Fragment>
  );
}
// import React, { useEffect, useState } from 'react';
// import Link from '@material-ui/core/Link';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Title from '../layout/title';
// import Chart from "react-apexcharts";
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles(theme => ({
//   depositContext: {
//     flex: 1,
//   },
//   paper: {
//   	maxHeight: 90,
//     margin: theme.spacing(2),
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#06171E'
   
//   },
//   chart: {
//   	marginTop: theme.spacing(4),
//   }
// }));

// var optionsProgress = {};

// var series = [];

// export default function ProgressBar(props) {
//   const classes = useStyles();
//   const [progressBarState, setProgressBarState] = useState(props);

//   return (
//     <React.Fragment>
//      	<Title>{progressBarState.titulo}</Title>
//       	<div className={classes.chart}>
//       	{
//       		progressBarState.data.map((item, key) => {
//       			console.log(item);
//       			optionsProgress = {
// 				  chart: {
// 				    height: 70,
// 				    type: 'bar',
// 				    stacked: true,
// 				    sparkline: {
// 				      enabled: true
// 				    }
// 				  },
// 				  plotOptions: {
// 				    bar: {
// 				      horizontal: true,
// 				      barHeight: '20%',
// 				      colors: {
//         				backgroundBarColors: ['#030E13']
//       				  }	
// 				    },
// 				  },
// 				  colors: ['#00ABD7'],
// 				  stroke: {
// 				    width: 0,
// 				  },
// 				  title: {
// 				    floating: true,
// 				    offsetX: -10,
// 				    offsetY: 5,
// 				    text: item.name,
// 				    style: {
// 				      fontSize: '16px',
// 				      fontFamily: 'Montserrat',
// 					  fontStyle: 'normal',
// 					  fontWeight: 'normal',
// 					  color:  '#FFFFFF'
// 				    }
// 				  },
// 				  subtitle: {
// 				    floating: true,
// 				    align: 'right',
// 				    offsetY: 0,
// 				    text: `${item.value}`,
// 				    style: {
// 				      fontSize: '16px',
// 				      fontFamily: 'Montserrat',
// 					  fontStyle: 'normal',
// 					  fontWeight: 'bold',
// 					  color:  '#FFFFFF'
// 				    }
// 				  },
// 				  tooltip: {
// 				    enabled: false
// 				  },
// 				  xaxis: {
// 				    categories: [item.name],
// 				  },
// 				  yaxis: {
// 				  	max: progressBarState.max
// 				  }
// 				};
//       			series = [{
//       				name: item.name,
//       				data: [item.value]
//       			}];

//       			return (
//       			  	<Paper elevation={0} className={classes.paper} key={key}>
//       					<Chart
//       					options={optionsProgress}
// 		              	height={70}
// 		              	series={series}
// 		              	type="bar"/>
//       				</Paper>
//       			)
//       		})
//       	}
//       	</div>
//     </React.Fragment>
//   );
// }