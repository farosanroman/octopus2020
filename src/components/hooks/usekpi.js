import { useState ,useEffect} from "react";
 export const useKpi = initialKPI => {
  const [kpi, setKpi] = useState(initialKPI);
  const [kpifiltro, setKpiFiltro] = useState(initialKPI);
  const [kpicant,setKpiCant]=useState(0)
  const [kpi2G, setKpi2G] = useState({"type":"FeatureCollection","features":[] });
  const [kpi3G, setKpi3G] = useState({"type":"FeatureCollection","features":[] });
  const [kpi4G, setKpi4G] = useState({"type":"FeatureCollection","features":[] });
  const[criterio,setCriterio]=useState({"G2G":true,"G3G":true,"G4G":true})
  useEffect(() => {
    
    var f2=[]
    var f3=[]
    var f4=[]
    var func=[]
      var f = kpi.map((k, i) => {
      //  if (index.indexOf(r.idfuncional) ==-1) {  
        if (k.mobilegeneration=="2G"){ 
           f2.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
        }
        if (k.mobilegeneration=="3G"){ 
            f3.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
         }
         if (k.mobilegeneration=="4G"){ 
            f4.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
         }
       });
       
       setKpi2G({"type":"FeatureCollection","features":f2 });
       setKpi3G({"type":"FeatureCollection","features":f3});;
       setKpi4G({"type":"FeatureCollection","features":f4});
       setKpiCant(kpi.length)
  },[]);
  //alert(JSON.stringify(initialRoles))
  const handleKpiDay = async (dia) => {
      alert("dia  handleKpiDay  "+JSON.stringify(dia))
setKpi(dia)
var f2=[]
var f3=[]
var f4=[]
var func=[]
  var f = dia.map((k, i) => {
  //  if (index.indexOf(r.idfuncional) ==-1) {  
    
    if (k.mobilegeneration=="2G"){ 
       
       f2.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
    }
    if (k.mobilegeneration=="3G"){ 
        f3.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
     }
     if (k.mobilegeneration=="4G"){ 
        f4.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
     }
   });
   //alert("dia   bbb "+JSON.stringify(f2))
   setKpi2G({"type":"FeatureCollection","features":f2 });
   setKpi3G({"type":"FeatureCollection","features":f3});;
   setKpi4G({"type":"FeatureCollection","features":f4});
   setKpiCant(dia.length)
  }
  const handleKpiFiltro = async (filtro) => {
     // alert("useKpi filtro"+JSON.stringify(filtro))
      setCriterio(filtro)
        //alert(criterio)
      //var ff=roles.filter(r => r.idfuncional == idfuncional )
     // var kpi2=kpi2G
      //kpi2.features.push(kpi2.features[0])
      //setKpi2G(kpi2)
      
      var f2=[]
    var f3=[]
    var f4=[]
    var func=[]
      var f = kpi.map((k, i) => {
      //  if (index.indexOf(r.idfuncional) ==-1) {  
        if ((k.mobilegeneration=="2G")&&(filtro.G2G)){ 
           f2.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
        }
        if ((k.mobilegeneration=="3G")&&(filtro.G3G)){ 
            f3.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
         }
         if ((k.mobilegeneration=="4G")&&(filtro.G4G)){ 
            f4.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
         }
       });

       setKpi2G({"type":"FeatureCollection","features":f2 });
       setKpi3G({"type":"FeatureCollection","features":f3});;
       setKpi4G({"type":"FeatureCollection","features":f4});
       setKpiCant(kpi.length)
  }
  return [
criterio, kpicant,   kpi2G,kpi3G,kpi4G,
    handleKpiFiltro,handleKpiDay
  ];
};
