import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {red,amber} from '@material-ui/core/colors';


import App from './App';
import * as serviceWorker from './serviceWorker';
const themeX = createMuiTheme({
    palette: {
      type: 'dark',
     
      primary: {
        light: "#64b5f6",
        main: "#2196f3",
        dark: "#1976d2",
        contrastText: "blue"
      },
      secondary: {
        light: amber[300],
        main: amber[500],
        dark: amber[700]
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
