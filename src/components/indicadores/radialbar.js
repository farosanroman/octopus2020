import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../layout/title';
import Chart from "react-apexcharts";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  infoLight: {
  	fontFamily: 'Montserrat',
	fontStyle: 'normal',
	fontWeight: 'normal',
	fontSize: '16px',
  	'&::before': {
  		content: `'aa'`,
		width: '15px',
		height: '15px',
		backgroundColor: '#ACDFEC',
		marginRight: '8px',
		borderRadius: '50%',
		color: 'transparent'
  	}
  },
  info: {
  	fontFamily: 'Montserrat',
	fontStyle: 'normal',
	fontWeight: 'normal',
	fontSize: '16px',
  	'&::before': {
  		content: `'aa'`,
		width: '15px',
		height: '15px',
		backgroundColor: '#00AAD0',
		marginRight: '8px',
		borderRadius: '50%',
		color: 'transparent'
  	}
  },
  devices: {
  	fontFamily: 'Montserrat',
	fontStyle: 'italic',
	fontWeight: '300',
	fontSize: '12px',
	color:'#ABE3F0',
	marginLeft: '24px'
  }
});
       
export default function RadialBar(props) {
  const classes = useStyles();
  const total = props.totals.reduce((prevValue, currentValue) => prevValue + currentValue, 0)
  var oo = {
    chart: {
      height: 300,
      type: 'radialBar',
    },
    plotOptions: {
    	radialBar: {
    		track: {
    			strokeWidth: 3,
    			background: '#0A232F',
	    	},
    		dataLabels: {
    			 name: {
                  show: true,
                  color: '#FFFFFF',
                  fontFamily: 'Montserrat',
                  fontSize: '14px',
                  fontWeight: 'normal',
                },
                value: {
                  show: true,
                  fontFamily: 'Montserrat',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                },
    			total: {
        			show: true,
            		label: 'Total',
            		color: '#FFFFFF',
            		fontFamily: 'Montserrat',
                  	fontSize: '14px',
                  	fontWeight: 'normal',
            		formatter: function (w) {
                		return total;
             		}
        		}
        	}
    	}, 
    },
	colors: ['#00AAD0', '#ACDFEC'],
	labels: ['4G', '3G']
   };
  return (
    <React.Fragment>
     <Grid container spacing={2}>
     	<Grid item xs container direction="column" spacing={2}>
     		<Grid item xs>
      			<Title>{props.titulo}</Title>
      		</Grid>
      		<Grid item>
      			<div>
	      			<p className={classes.infoLight}>
	      				{`3G - ${props.percentages[1]}%`}
	      			</p>
	      			<p className={classes.devices}>
	      				{ `${props.totals[1]} devices` }
	      			</p>
	      		</div>
	      		<div>
	      			<p className={classes.info}>
	      				{`4G - ${props.percentages[0]}%`}
	      			</p>
	      			<p className={classes.devices}>
	      				{ `${props.totals[0]} devices` }
	      			</p>
      			</div>
      		</Grid>
      	</Grid>
      	<Grid item xs = {8}>
            	<Chart
	              options={oo}
	              height={300}
	              series={props.percentages}
	              type="radialBar"/>
     	</Grid>
     </Grid>
    </React.Fragment>
  );
}