//https://itnext.io/how-to-create-react-custom-hooks-for-data-fetching-with-useeffect-74c5dc47000a
//https://react-tracked.js.org/docs/introduction   WAO LO MEJOR QUE HE VISTO useReducer y useContext
export const defaultState = {
   
    flagLogin:false,
    flag:true,
    kpi:
    [
       
          {
            "id": "08edea07-8e4f-43bb-b553-69a8fd36ebd0",
            "timestamp": "10/28/2018 1:44",
            "mobilegeneration": "4G",
            "cellid": 160682,
            "cidreported": 4113410,
            "mcc": 734,
            "mnc": 4,
            "lac": 10206,
            "loc": 1,
            "lon": -66.7985953,
            "lat": 10.4798365,
            "signaltype": "LTE",
            "signalstrength": 18,
            "rsrq": -10,
            "rsrp": -105,
            "bhealth": "GOOD",
            "blevel": 0,
            "bsource": "AC",
            "bstatus": "CHARGING",
            "btemp": 350,
            "bvolts": 3733,
            "bslon": -66.808013,
            "bslat": 10.469127,
            "status": "NULL"
          }
    ]
  ,
    kpiday:[],
    kpifechas:[],
    login:{id:"id",type:"login",name:"mister",photoURL:"https://image.shutterstock.com/image-vector/photo-camera-icon-260nw-197166461.jpg",email:"",phone:"",cedula:""}, //FIREBASE AUTH
    geolocation:{country:"VE",countrylong:"VE",estado:"ES",municipio:"MU",municipiolong:"MUNICIPIO",ciudad:"VE",ciudadlong:"VE",urbanizacion:"URB",urbanizacionlong:"URB",ruta:"RUTA",rutalong:"RUTALONG",premisa:"PREMISA",premisalong:"PREMISALONG",postalcode:"postalcode"},
    position:{ latitude:9, longitude:-66, timestamp:0, accuracy:0, error:null },  //hook
    ///// GeoJSON
    lnglat:[-66.9188,10.508],
    zoom:[12],
    radio:3,
    /////
    
    };
  
  export const reducer = (state = defaultState, action) => {
      const { type, stateprop } = action;
      switch (type) {
        case 'FLAG':
            return { ...state, flag: stateprop };  
        case 'KPI':
            var fechas=[]
            var fechasjson=[]
            var vv = stateprop.map((v, i) => {
                if (fechas.indexOf(v.timestamp.substr(0,10))==-1){
                    fechas.push(v.timestamp.substr(0,10))
                    var f=v.timestamp.split("/")
                   //fechasjson.push({day:v.timestamp.substr(6,4)+"-"+v.timestamp.substr(0,2)+"-"+v.timestamp.substr(3,2),value:0})
                   if (f[0]<9)f[0]="0"+f[0]
                   if (f[1]<9)f[1]="0"+f[1]
                   fechasjson.push({day:f[2].substr(0,4)+"-"+f[0]+"-"+f[1],value:0})
               
                }
  //              return v.timestamp.substr(0,8).indexOf(v.timestamp.substr(0,8))==i;
            })
            console.log(JSON.stringify(fechasjson))
            //var filteredKpi = cedulas.filter(function(item, pos){
            //    return cedulas.timestamp.substr(0,8).indexOf(item.timestamp.substr(0,8))== pos; 
            //  });
           // alert(fechas.length)
           //   alert(JSON.stringify(fechas))
        return { ...state, kpi: stateprop,kpifechas:fechasjson };  
        case 'KPIDAY':
            var fechas=[]
            var fechasjson=[]
            var kpiday=[]
           // console.log(state.kpi)
            var vv = state.kpi.map((v, i) => {
                var f=v.timestamp.split("/")
                if (f[0]<9)f[0]="0"+f[0]
                if (f[1]<9)f[1]="0"+f[1]
                if (f[2].substr(0,4)+"-"+f[0]+"-"+f[1]==stateprop){
                    kpiday.push(v)
                }
  //              return v.timestamp.substr(0,8).indexOf(v.timestamp.substr(0,8))==i;
            })
           // alert(kpiday.length)
        return { ...state, kpiday:kpiday };  
      case 'LNGLAT':
          return { ...state, lnglat: stateprop };
      case 'POSITION':
               // alert("POSITION")
      return { ...state, position: stateprop };
      case 'ZOOM':
          let radio=3;
          if ( stateprop>12) radio=10
         return { ...state,radio:radio, zoom: stateprop };
      //////////////////////////////////////
      ////////////////////////////////////
      case 'FILTRO_ORGANIZACION':
       // alert(stateprop)
        //alert(JSON.stringify(state.organizacion))
        let organizacion = state.organizacion.map((org) => {
         if (org.id==stateprop){  
         if (org.selected==true){ 
                org.selected=false}
                else
                {org.selected=true}
          }
         return org;
        });
      
       // alert(JSON.stringify(organizacion))
          return {
            ...state, organizacion:organizacion
          };
          case 'FILTRO_ROLES':
              // alert(stateprop)
               //alert(JSON.stringify(state.organizacion))
               let roles = state.roles.map((rol) => {
                if (rol.id==stateprop){  
                     if (rol.selected==true){ 
                        rol.selected=false}
                        else
                        {rol.selected=true}
                 }
                return rol;
               });
             
             // alert(JSON.stringify(roles))
                 return {
                   ...state, roles:roles
                 };
             
          case 'TOGGLE_PLATE_AVAILABILITY':
              let updatedPlates = state.plates[state.currentUnits].map(plate => {
                if (plate.weight === stateprop) plate.available = !plate.available;
                return plate;
              });
              return {
                ...state,
                plates: { ...state.plates, [state.currentUnits]: updatedPlates }
              };

      
      
      
      
      
    
        
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
    //https://www.youtube.com/watch?v=dPY8y4CB3mI
    //https://www.youtube.com/watch?v=zWsZcBiwgVE&feature=youtu.be&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf