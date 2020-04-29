import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {red,amber,grey} from '@material-ui/core/colors';


import App from './App';
import * as serviceWorker from './serviceWorker';
const themeX = createMuiTheme({
    palette: {
      type: 'dark',
     
      primary: {
        main: '#0A232F',
        light: '#212121',

        dark: '#212121',
        contrastText: "white"
      },
      secondary: {
        light: grey[700],
        main: grey[100],
        dark: grey[700]
      },
    }
    
  });
  ReactDOM.render(
    <MuiThemeProvider theme={themeX}>
      <App />
    </MuiThemeProvider>
    ,
    document.querySelector("#root")
  );


//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
