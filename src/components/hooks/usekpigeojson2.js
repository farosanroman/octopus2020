import { useState ,useEffect} from "react";
 export const useKpiGeoJson2 = initialKPI => {
    const [kpi0, setKpi0] = useState(initialKPI);
    const [day, setDay] = useState("");
 
    const [kpi, setKpi] = useState(initialKPI);
  const [kpifiltro, setKpiFiltro] = useState(initialKPI);
  const [kpicant,setKpiCant]=useState(0)
  const [kpi2G, setKpi2G] = useState({"type":"FeatureCollection","features":[] });
  const [kpi3G, setKpi3G] = useState({"type":"FeatureCollection","features":[] });
  const [kpi4G, setKpi4G] = useState({"type":"FeatureCollection","features":[] });
  const [kpiRuta, setKpiRuta] = useState({"type":"FeatureCollection","features":[] });

  const[criterio,setCriterio]=useState({"G2G":true,"G3G":true,"G4G":true})
  useEffect(() => {
    
    var f2=[]
    var f3=[]
    var f4=[]
    var ru=[]

    //alert("pki "+JSON.stringify(kpi.features))
     if (kpi.features!=undefined){
      var f = kpi.features.map((feature, i) => {
       // alert("pki "+JSON.stringify(feature))
      //  if (index.indexOf(r.idfuncional) ==-1) {  
     //     alert(feature.properties.mobilegeneration)
     //console.log(i+" "+JSON.stringify(criterio))
        if ((feature.properties.mobilegeneration=="2G")&&(criterio.G2G)){ 
           f2.push(feature)
        }
        if ((feature.properties.mobilegeneration=="3G")&&(criterio.G3G)){ 
            f3.push(feature)
         }
         if ((feature.properties.mobilegeneration=="4G")&&(criterio.G4G)){ 
            f4.push(feature)
         }
          ru.push(feature.geometry.coordinates)
          
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
       setKpi2G({"type":"FeatureCollection","features":f2 });
       setKpi3G({"type":"FeatureCollection","features":f3});;
       setKpi4G({"type":"FeatureCollection","features":f4});
       setKpiCant(kpi.length)
       
    }
  },[kpi,criterio]);
  const handleKpiDay = async (kpi) => {
      //console.log(JSON.stringify(kpi))
    //   alert("handle"+kpi.length)
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
criterio, kpicant, kpiRuta ,kpi, kpi2G,kpi3G,kpi4G, handleKpiDay,handleKpiCriterio,handleKpiFiltroDay
    
  ];
};
