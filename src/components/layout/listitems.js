import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MapIcon from '@material-ui/icons/Map';

export const mainListItems = (
  <div>
    <ListItem button onClick={()=>alert()}>
      <ListItemIcon>
      <PersonPinCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <NetworkCheckIcon />
      </ListItemIcon>
      <ListItemText primary="Resultados" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="GeoFences" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PhoneIphoneIcon />
      </ListItemIcon>
      <ListItemText primary="Telefonos" />
    </ListItem>
   
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Manteniemitno" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Historicos</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Esta Semana" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Ultimo Mes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Ultimo Año" />
    </ListItem>
  </div>
);