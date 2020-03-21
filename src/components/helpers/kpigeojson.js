import {celular} from '../../data/celular.json';
export const kpigeojson=(tipo)=>{
    //alert(celular.length)
   /// alert("func1  "+e)

   //se comenzo pero se tenia usekpi
   
 if (tipo=="GEOJSON"){
   celular.sort(function(a, b) {
      var c = new Date(a.timestamp);
      var d = new Date(b.timestamp);
    return c-d;
 });

 var kk=[]
 var f = celular.map((k, i) => {
   kk.push( {
      "type": "Feature",
      "properties":k,
      "geometry": {
        "type": "Point",
        "coordinates": [k.lon,k.lat]
      }
   }
   )
   
 })
   return {"type":"FeatureCollection","features":kk }
 }
 if (tipo=="FECHA")
   {
   var signaltype=[]
    
    var fechas=[]
   var f = celular.map((k, i) => {
      signaltype.push(k.signaltype)   
      fechas.push(k.timestamp.substr(0,10).trim())
    })
    console.log(JSON.stringify(fechas))
    var uniquesignal=signaltype.filter(onlyUnique)
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
   console.log(JSON.stringify(uniquesignal))
   var G2={"HSPA":0,"HSPAP":0,"UMTS":0,"LTE":0,"HSUPA":0,"UNKNOWN":0,"EDGE":0,"HSDPA":0}
   var G3={"HSPA":0,"HSPAP":0,"UMTS":0,"LTE":0,"HSUPA":0,"UNKNOWN":0,"EDGE":0,"HSDPA":0}
   var G4={"HSPA":0,"HSPAP":0,"UMTS":0,"LTE":0,"HSUPA":0,"UNKNOWN":0,"EDGE":0,"HSDPA":0}
   var tipo="HSPAP"
  // G2={...G2,[tipo]:G2[tipo]+1}
  // G2={...G2,[tipo]:G2[tipo]+1}
  // G2={...G2,[tipo]:G2[tipo]+1}
  //{"HSPA":8,"HSPAP":27,"UMTS":0,"LTE":0,"HSUPA":0,"UNKNOWN":4,"EDGE":19,"HSDPA":0}
  //{"HSPA":6044,"HSPAP":14523,"UMTS":50,"LTE":2,"HSUPA":12,"UNKNOWN":6,"EDGE":0,"HSDPA":2}
  // {"HSPA":1,"HSPAP":0,"UMTS":0,"LTE":10648,"HSUPA":1,"UNKNOWN":0,"EDGE":0,"HSDPA":0}
  var GG=[
   {
     name: "HSPA",
     data: [0,6044,1]
   },
   {
     name: "HSPAP",
     data: [27,14523,0]
   },
   {
     name: "UMTS",
     data: [0,50,0]
   },
   {
     name: "LTE",
     data: [0,2,10648]
   },
   {
     name: "HSUPA",
     data: [0,12,1]
   }
   ,
   {
     name: "UNKNOWN",
     data: [4,6,0]
   }
   ,
   {
     name: "EDGE",
     data: [19,0,0]
   }
   ,
   {
     name: "HSDPA",
     data: [0,2,0]
   }
 ]
 // alert(JSON.stringify(G2))
  
   celular.map((k, i) => {
   //   alert(k.signaltype)
   if (k.mobilegeneration=="2G"){
      G2={...G2,[k.signaltype]:G2[k.signaltype]+1}
  //    alert(k.signaltype+" "+JSON.stringify(G3))
   }   
   if (k.mobilegeneration=="3G"){
         G3={...G3,[k.signaltype]:G3[k.signaltype]+1}
     //    alert(k.signaltype+" "+JSON.stringify(G3))
      }
      if (k.mobilegeneration=="4G"){
         G4={...G4,[k.signaltype]:G4[k.signaltype]+1}
       //  alert(k.signaltype+" "+JSON.stringify(G4))
      }

    })
    console.log(JSON.stringify(G2))
    console.log(JSON.stringify(G3))
    console.log(JSON.stringify(G4))
    return FECHAS 
 }  
    
    //console.log(JSON.stringify(kk))
   // return kk
}
//f2.push({"type":"Feature","properties":{"nombre":k.mobilegeneration},"geometry":{"type":"Point","coordinates":[k.lon,k.lat] }   })
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}      