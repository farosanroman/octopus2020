import { ADD_KPI } from './types';

const addKPI = (kpi, state) => {
  //  console.log("aaaddKPI")
  //  console.log(JSON.stringify(kpi))
  //const newKPI = [...state.KPI, kpi];
  const cant=100;
 // console.log("stateKPI")
  //console.log(JSON.stringify(newKPI))
//   alert(JSON.stringify({
//     ...state,
//     KPI: newKPI,CANT:cant
//   }))
  return {
    ...state,
    KPI:kpi,CANT:cant
  };
};

export default (state, action) => {
   // alert(JSON.stringify(action))
  switch (action.type) {
    case ADD_KPI:
      return addKPI(action.payload, state);
    default:
      return state;
  }
};


export const initialStateKPI = {
    CANT:0,
  KPI: {"type":"FeatureCollection","features":[] }
};  
  // flagLogin:false,

    
    // login:{id:"id",type:"login",name:"mister",photoURL:"https://image.shutterstock.com/image-vector/photo-camera-icon-260nw-197166461.jpg",email:"",phone:"",cedula:"",lat:0,lng:0,idorg:0,org:"",idfuncional:0,funcional:"",idrol:0,rol:"",codcne:"000000000"}, //FIREBASE AUTH
    // geolocation:{country:"VE",countrylong:"VE",estado:"ES",municipio:"MU",municipiolong:"MUNICIPIO",ciudad:"VE",ciudadlong:"VE",urbanizacion:"URB",urbanizacionlong:"URB",ruta:"RUTA",rutalong:"RUTALONG",premisa:"PREMISA",premisalong:"PREMISALONG",postalcode:"postalcode"},
    // position:{ latitude:9, longitude:-66, timestamp:0, accuracy:0, error:null },  //hook
    // ///// GeoJSON
    // days:[],
    // cantantenas:0,
    // cantdispositivos:12,
    // kpi:{"type":"FeatureCollection","features":[] }
   
    
    