import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 12,
    label: '12',
  },
  {
    value: 14,
    label: '14',
  },
  {
    value: 16,
    label: '16',
  },
  {
    value: 18,
    label: '18',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 22,
    label: '22',
  },  {
    value: 24,
    label: '24',
  },

];

function valuetext(value) {
   // console.log(value)
  return `${value}`;
}
function handleChange  (event, value){
  //  console.log("#"+value[0]+" "+value[1]+"#")
};

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

export default function GeoSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Rango de Horas
      </Typography>
      <Slider
      onChange={handleChange}
        defaultValue={[0,24]}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={2}
        marks={marks}
        min={0}
        max={24}
        valueLabelDisplay="auto"
      />
     
    </div>
  );
}