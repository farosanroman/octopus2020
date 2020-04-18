import { useState ,useEffect} from "react";
 export const useKpiGeoJson = initialKPI => {
    const [kpi0, setKpi0] = useState(initialKPI);
    const [day, setDay] = useState("");
 
    const [kpi, setKpi] = useState(initialKPI);
  const [kpifiltro, setKpiFiltro] = useState(initialKPI);
  const [kpicant,setKpiCant]=useState(0)
  const [kpi2Gcant,setKpi2GCant]=useState(0)
  const [kpi3Gcant,setKpi3GCant]=useState(0)
  const [kpi4Gcant,setKpi4GCant]=useState(0)
 
  const [kpi2G, setKpi2G] = useState({"type":"FeatureCollection","features":[] });
  const [kpi3G, setKpi3G] = useState({"type":"FeatureCollection","features":[] });
  const [kpi4G, setKpi4G] = useState({"type":"FeatureCollection","features":[] });
  const [kpiRuta, setKpiRuta] = useState({"type":"FeatureCollection","features":[] });
 
  const[criterio,setCriterio]=useState({"G2G":true,"G3G":true,"G4G":true})
  //histograma de RSRP RSRQ
  useEffect(() => {
    //alert("pki "+JSON.stringify(kpi))
    
    var f2G=[]
    var f3G=[]
    var f4G=[]
    var ru=[]
    var cant=0
    var cant2G=0
    var cant3G=0
    var cant4G=0
    //console.log("useKpiGeoJson  "+JSON.stringify(criterio))
     if (kpi.features!=undefined){
      var f = kpi.features.map((feature, i) => {
        // feature.geometry.coordinates[0]=feature.geometry.coordinates[0]-7.2
        // feature.geometry.coordinates[1]=feature.geometry.coordinates[1]-5.85
      })
      var f = kpi.features.map((feature, i) => {

       // alert("pki "+JSON.stringify(feature))
      //  if (index.indexOf(r.idfuncional) ==-1) {  
     //     alert(feature.properties.mobilegeneration)
     //console.log(i+" "+JSON.stringify(criterio))
        if ((feature.properties.mobilegeneration=="2G")&&(criterio.G2G)){ 
           f2G.push(feature)
           cant2G+=1
        }
        if ((feature.properties.mobilegeneration=="3G")&&(criterio.G3G)){ 
            f3G.push(feature)
            cant3G+=1
         }
         if ((feature.properties.mobilegeneration=="4G")&&(criterio.G4G)){ 
            f4G.push(feature)
            cant4G+=1
         }
          ru.push(feature.geometry.coordinates)
          cant+=1;
       });
       
        setKpiRuta({"type":"FeatureCollection","features":
            [
               {
                 "type": "Feature",
                 "properties": {
                 "marker-symbol": "telephone"
               },
               "geometry": {
                "type": "LineString",
                "coordinates": ru
               }
              }
            ]

        })
        //console.log(JSON.stringify(ru))
       setKpi2G({"type":"FeatureCollection","features":f2G });
       setKpi3G({"type":"FeatureCollection","features":f3G});;
       setKpi4G({"type":"FeatureCollection","features":f4G});
       setKpiCant(cant)
       setKpi2GCant(cant2G)
       setKpi3GCant(cant3G)
       setKpi4GCant(cant4G)
    }
    //"SLOW-2G
   // console.log(JSON.stringify(kpi))
  },[kpi,criterio]);
  const handleKpiDay = async (kpi) => {
     //ACTUALIZA los kp0 INICIALIZACION
      //console.log(JSON.stringify(kpi))
      // alert("handleKpiDay"+JSON.stringify(kpi))
   setKpi0(kpi)
   setKpi(kpi)
}
const handleKpiCriterio = async (cri) => {
    setCriterio(cri)
 }
const handleKpiFiltroDay = async (day) => {
     
     var featuresday=[]
     kpi0.features.map((f, i) => {
        if (f.properties.timestamp.substr(0,10).trim()==day){
            featuresday.push(f)
        }    
      })
      setKpi({"type":"FeatureCollection","features":featuresday})
     setDay(day)
 }

  return [
criterio, kpicant,kpi2Gcant,kpi3Gcant,kpi4Gcant, kpiRuta ,kpi, kpi2G,kpi3G,kpi4G, 
handleKpiDay,handleKpiCriterio,handleKpiFiltroDay
    
  ];
};
