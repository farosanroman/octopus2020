//https://itnext.io/how-to-create-react-custom-hooks-for-data-fetching-with-useeffect-74c5dc47000a
//https://react-tracked.js.org/docs/introduction   WAO LO MEJOR QUE HE VISTO useReducer y useContext
export const defaultState = {
   
    flagLogin:false,

    user:{
      "id": "octotestingv2@gmail.com",
      "login": "octotestingv2@gmail.com",
      "password": "32111",
      "first": "Gabriel",
      "last": "Boyerizo",
      "isEnabled": true,
      "isAdmin": true,
      "isRoot": true,
      "dateCreation": "2020-04-24T02:21:46.790Z",
      "dateModification": "2020-04-24T02:21:46.790Z",
  },
    //login:{id:"id",type:"login",name:"mister",photoURL:"https://image.shutterstock.com/image-vector/photo-camera-icon-260nw-197166461.jpg",email:"",phone:"",cedula:"",lat:0,lng:0,idorg:0,org:"",idfuncional:0,funcional:"",idrol:0,rol:"",codcne:"000000000"}, //FIREBASE AUTH
    geolocation:{country:"VE",countrylong:"VE",estado:"ES",municipio:"MU",municipiolong:"MUNICIPIO",ciudad:"VE",ciudadlong:"VE",urbanizacion:"URB",urbanizacionlong:"URB",ruta:"RUTA",rutalong:"RUTALONG",premisa:"PREMISA",premisalong:"PREMISALONG",postalcode:"postalcode"},
    position:{ latitude:9, longitude:-66, timestamp:0, accuracy:0, error:null },  //hook
    ///// GeoJSON
    days:[],
    cantantenas:0,
    cantdispositivos:12,
    kpi:{"type":"FeatureCollection","features":[] }
   
    
    };
  
  export const reducer = (state = defaultState, action) => {
      const { type, stateprop } = action;
      switch (type) {
       
        case 'FLAGLOGIN':
          //FIREBASE
         // alert("LOGIN en reducer"+JSON.stringify(stateprop)   )
        return { ...state, flagLogin: stateprop };
      case 'USER':
          //FIREBASE
          //alert("LOGIN en reducer"+JSON.stringify(stateprop)   )
        return { ...state, user: stateprop };
      
        case 'DAYS':
          //FIREBASE
        //  alert("DIAS en reducer"+JSON.stringify(stateprop)   )
        return { ...state, days: stateprop };
        case 'CANTANTENAS':
          //FIREBASE
        //  alert("DIAS en reducer"+JSON.stringify(stateprop)   )
        return { ...state, cantantenas: stateprop };
        case 'KPI':
          //FIREBASE
        //  alert("DIAS en reducer"+JSON.stringify(stateprop)   )
        return { ...state, kpi: stateprop };
      
    
        
        case 'CALCULATE':
          let availablePlates = state.plates[state.currentUnits].reduce(
            (acc, plate) => {
              if (plate.available) acc.push(plate.weight);
              return acc;
            },
            []
          );
          const currentWeight = calcPlates(
            stateprop,
            availablePlates,
            state.currentBar[state.currentUnits]
          );
          return { ...state, currentWeight };
    
        case 'RESET':
          window.localStorage.removeItem('vinotinto');
          return { ...state, currentWeight: null };
    
        default:
          return state;
      }
    };
  
    function calcPlates(targetWeight, weights, bar = 45) {
      weights.sort((a, b) => b - a); // plates examined heaviest to lightest
    
      let perSideTarget = (targetWeight - bar) / 2; // weight for each side of bar
    
      let plates = weights.reduce((acc, weight) => {
        let qty = perSideTarget / weight;
        if (qty >= 1) {
          qty = Math.floor(qty); // remove remainder
          acc.push({ weight, qty }); // add to plates array
          perSideTarget -= weight * qty; // reduce target weight
        }
        return acc;
      }, []);
    
      if (perSideTarget) console.log(`${perSideTarget} short on each side`);
    
      const remainder = perSideTarget * 2;
    
      return {
        plates,
        bar,
        totalWeight: targetWeight - remainder,
        targetWeight,
        remainder
      };
      // [ {weight: 45, qty: 2}, {{weight: 10, qty: 2}} ]
    }