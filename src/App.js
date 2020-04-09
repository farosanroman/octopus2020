import React, { useState,Fragment,useEffect,useReducer } from 'react';
import logo from './logo.png';
import './App.css';

import Button from '@material-ui/core/Button';
import Login from './components/layout/login'
import Dashboard from './components/layout/dashboard'
import { reducer, defaultState } from './Context';

import KpiContext from './context/kpiContext'
import kpiReducer from './context/kpiReducer'

import {initialStateKPI} from './context/kpiReducer'
import {ADD_KPI} from './context/types'


export const Application = React.createContext({ state: null, dispatch: null });


//import Fotos from '../src/components/fotos'
const App = () => {

const [stateKPI, dispatchKPI] = useReducer(kpiReducer, initialStateKPI);
const changeKPI = (kpi) => {
  dispatchKPI(kpi);
};

  
  ///////////////////////////////////////////////////
  //////////////////////////////////////////////////
  // const initialState = () => JSON.parse(window.localStorage.getItem('octopus2020')) || defaultState;
  const [pag, setPag] = useState(0);
  const initialState = () => defaultState;
 
  const [state, dispatch] = React.useReducer(reducer, initialState());
 // alert(JSON.stringify(state))

   
  React.useEffect(() => {
    window.localStorage.setItem('octopus2020', JSON.stringify(state));
  }, [state]);
const onLoginClick = () => {  
    
      setPag(1)
  }
  return (
    <KpiContext.Provider value={{stateKPI,dispatchKPI}}>
  
    <Application.Provider value={{ state, dispatch }}>
       
     {(pag==0)&&<Login loginclick={onLoginClick} />}
     {(pag==1)&&<Dashboard />}
          
     </Application.Provider>
     </KpiContext.Provider>
  
  );
}
export default App;
//HOOKS 
//Kent useToogle with useReducer
//https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks
//https://www.youtube.com/watch?v=-G43PbpmGrA
//https://github.com/hidjou/classsed-react-hooks/tree/useMemoRef GITHUB

//https://www.youtube.com/watch?v=cjBm0HnYcqw BEST ON CONTEXT AND REDUCER   BEST BEST BEST OjO
//https://dev.to/pubudu/build-a-redux-like-store-with-react-context-hooks-8a6   VERY SIMPLE AND GOOD

//IMAGES
//https://gifmaker.me/
//https://onlinepngtools.com/convert-png-to-base64

//https://arxiv.org/pdf/1711.10089.pdf
//https://mapshaper.org/

//https://medium.com/octopus-labs-london/replacing-redux-with-react-hooks-and-context-part-1-11b72ffdb533 
//https://medium.com/octopus-labs-london/replacing-redux-with-react-hooks-and-context-part-2-838fd20e6739

//APEXCHARTS
//https://codinhood.com/how-to-build-bitcoin-dca-chart-react-recharts recharts fondo negro BITCOINS
//https://www.bypeople.com/timeline-bar-line-chart-data-javascript/
//https://codesandbox.io/s/mzzq3yqjqj apexcharts
//https://codepen.io/junedchhipa/pen/YJQKOy
//https://codepen.io/apexcharts/pen/pxZKqL
//https://www.youtube.com/watch?v=JxEyXOlSgV0 apexcharts
//https://codepen.io/junedchhipa/pen/YJQKOy compuesto apexcharts


//https://www.youtube.com/watch?v=f687hBjwFcM&t=4706s
//https://www.youtube.com/playlist?list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM
//https://www.youtube.com/watch?v=4BranN3qnDU
