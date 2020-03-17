export const kpigeojson=(kpi,tipo)=>{
    //alert(e)
   /// alert("func1  "+e)

   //se comenzo pero se tenia usekpi
   kpi.sort(function(a, b) {
        var c = new Date(a.timestamp);
        var d = new Date(b.timestamp);
      return c-d;
   });
 
   var fechas=[]
   var kk=[]
   var f = kpi.map((k, i) => {
     kk.push( {
        "type": "Feature",
        "properties":k,
        "geometry": {
          "type": "Point",
          "coordinates": [k.lon,k.lat]
        }
     }
     )
     fechas.push(k.timestamp.substr(0,10).trim())
   })
   console.log(JSON.stringify(fechas))
   var unique = fechas.filter( onlyUnique ); // returns ['a', 1, 2, '1']
   var FECHAS=[]
   unique.map((f, i) => {
      var fsplit=f.split("/")
      console.log(fsplit)
      if (fsplit[1].length==1){fsplit[1]="0"+fsplit[1]}
      var fecha=fsplit[2]+"-"+fsplit[0]+"-"+fsplit[1]
      FECHAS.push({"day":fecha,"value":0})
      
   })
   console.log(JSON.stringify(unique))
console.log(JSON.stringify(FECHAS))
 if (tipo=="GEOJSON"){
   return {"type":"FeatureCollection","features":kk }
 }else{
  return FECHAS 
 }  
    
    //console.log(JSON.stringify(kk))
   // return kk
}
//f2.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}      