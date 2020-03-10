import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


var rows=[
{
    "cellid": 160021,
    "mobilegeneration": "4G",
    "technology": "LTE",
    "lon": -66.894276,
    "lat": 10.504417
  },
  {
    "cellid": 160022,
    "mobilegeneration": "4G",
    "technology": "LTE",
    "lon": -66.894276,
    "lat": 10.504417
  },
  {
    "cellid": 160023,
    "mobilegeneration": "4G",
    "technology": "LTE",
    "lon": -66.894276,
    "lat": 10.504417
  },
  {
    "cellid": 160091,
    "mobilegeneration": "4G",
    "technology": "LTE",
    "lon": -66.916207,
    "lat": 10.516249
  },
  {
    "cellid": 160092,
    "mobilegeneration": "4G",
    "technology": "LTE",
    "lon": -66.916207,
    "lat": 10.516249
  }]
const rows2 = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(cellid, mobilegeneration, technology, lon, lat) {
    return { cellid, mobilegeneration, technology, lon, lat };
  }
export default function Antenas() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>CellID</TableCell>
            <TableCell align="right">MogileGeneration</TableCell>
            <TableCell align="right">Technology</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.cellid}>
              <TableCell component="th" scope="row">
                {row.cellid}
              </TableCell>
              <TableCell align="right">{row.mobilegeneration}</TableCell>
              <TableCell align="right">{row.technology}</TableCell>
              <TableCell align="right">{row.lon}</TableCell>
              <TableCell align="right">{row.lat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}