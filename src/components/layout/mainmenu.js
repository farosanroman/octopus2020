import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MapIcon from '@material-ui/icons/Map';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
export default function MainMenu(prop) {

  const handleMenuLayout = value => () => {
     
     prop.handleLayout(value)
  }
return (
    <div>
        <ListItem button onClick={handleMenuLayout(100)} >
      <ListItemIcon >
      <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={handleMenuLayout(0)} >
      <ListItemIcon >
      <NetworkCheckIcon />
      </ListItemIcon>
      <ListItemText primary="Mensajes" />
    </ListItem>
   
    <ListItem button  onClick={handleMenuLayout(2)}>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="GeoFences" />
    </ListItem>
    
    <ListItem button  onClick={handleMenuLayout(1)}>
      <ListItemIcon>
        <SettingsInputAntennaIcon />
      </ListItemIcon>
      <ListItemText primary="Antenas" />
    </ListItem>
    <ListItem button  onClick={handleMenuLayout(3)}>
      <ListItemIcon>
        <PhoneIphoneIcon />
      </ListItemIcon>
      <ListItemText primary="Telefonos" />
    </ListItem>
   
    <ListItem button  onClick={handleMenuLayout(4)}>
      <ListItemIcon>
        <SignalCellular3BarIcon />
      </ListItemIcon>
      <ListItemText primary="Manteniemitno" />
    </ListItem>
  </div>
)

}