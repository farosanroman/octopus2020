import React, { useState,Fragment,useEffect } from 'react';
import logo from './logo.png';
import './App.css';

import Button from '@material-ui/core/Button';
import Login from './components/layout/login'
import Dashboard from './components/layout/dashboard'
//import Fotos from '../src/components/fotos'
function App() {
  const [pag, setPag] = useState(0);
  const onLoginClick = () => {  
 
      setPag(1)
  }
  return (
    <div className="App">
       
     {(pag==0)&&<Login loginclick={onLoginClick} />}
     {(pag==1)&&<Dashboard />}
          
    </div>
  );
}

export default App;
//https://www.youtube.com/watch?v=f687hBjwFcM&t=4706s
//https://www.youtube.com/playlist?list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM
//https://www.youtube.com/watch?v=4BranN3qnDU
