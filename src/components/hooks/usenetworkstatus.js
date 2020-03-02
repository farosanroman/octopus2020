import React, { useState,Fragment,useEffect } from 'react';
 function getConnection() {
    return (
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection
    );
  }
  
  export  function useNetworkStatus() {
    let [connection, updateNetworkConnection] = useState(getConnection());
  
    function updateConnectionStatus() {
      updateNetworkConnection(getConnection());
    }
    useEffect(() => {
      connection.addEventListener("change", updateConnectionStatus);
      return () => {
        connection.removeEventListener("change", updateConnectionStatus);
      };
    }, []);
  
    return connection;
  }
  