import React, { useState,Fragment,useEffect } from 'react';
import logo from './logo.png';
import './App.css';

import Button from '@material-ui/core/Button';
import Login from './components/layout/login'
import Dashboard from './components/layout/dashboard'
import { reducer, defaultState } from './Context';
export const Application = React.createContext({ state: null, dispatch: null });
//import Fotos from '../src/components/fotos'
function App() {
  const [pag, setPag] = useState(0);
  const onLoginClick = () => {  
 
      setPag(1)
  }
  const initialState = () => JSON.parse(window.localStorage.getItem('octopus2020')) || defaultState;
  
  const [state, dispatch] = React.useReducer(reducer, initialState());
 // alert(JSON.stringify(state))

   
  React.useEffect(() => {
    window.localStorage.setItem('octopus2020', JSON.stringify(state));
  }, [state]);

  return (
    <Application.Provider value={{ state, dispatch }}>
       
     {(pag==0)&&<Login loginclick={onLoginClick} />}
     {(pag==1)&&<Dashboard />}
          
     </Application.Provider>
  );
}
export default App;
//https://www.youtube.com/watch?v=f687hBjwFcM&t=4706s
//https://www.youtube.com/playlist?list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM
//https://www.youtube.com/watch?v=4BranN3qnDU
