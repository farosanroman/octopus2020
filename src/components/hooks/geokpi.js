export const GeoKpi=(data,criteria,callback)=>{
   // alert(data.length)
    //alert(data[0].timestamp.substr(0,5)+"l")
    //alert((data[0].timestamp.substr(0,5)=='10/28'))
    var dat=[]
    //for (var i = 25000; i < data.length-3000; i++) {
    for (var i =0; i < data.length; i++) {
             if (criteria.color=="red"){
             // if ((data[i].mobilegeneration=="4G")&&((-110>=data[i].rsrp)&&(-150<=data[i].rsrp))){
                 // alert(data[i].rsrp)
                dat.push(data[i]) 
              
             // } 
            }
            if (criteria.color=="orange"){
                if ((data[i].mobilegeneration=="4G")&&((-100>=data[i].rsrp)&&(-110<=data[i].rsrp))){
                  dat.push(data[i]) 
                
                } 
              }
              if (criteria.color=="yellow"){
                if ((data[i].mobilegeneration=="4G")&&((-85>=data[i].rsrp)&&(-100<=data[i].rsrp))){
                  dat.push(data[i]) 
                
                } 
              }
              if (criteria.color=="green"){
                if ((data[i].mobilegeneration=="4G")&&((0>=data[i].rsrp)&&(-85<=data[i].rsrp))){
                  dat.push(data[i]) 
                
                } 
              }

              if (criteria.color=="red"){
                if ((data[i].mobilegeneration=="3G")&&((-95>=data[i].rsrp)&&(-150<=data[i].rsrp))){
                   // alert(data[i].rsrp)
                  dat.push(data[i]) 
                
                } 
              }
              if (criteria.color=="orange"){
                  if ((data[i].mobilegeneration=="3G")&&((-85>=data[i].rsrp)&&(-95<=data[i].rsrp))){
                    dat.push(data[i]) 
                  
                  } 
                }
                if (criteria.color=="yellow"){
                  if ((data[i].mobilegeneration=="3G")&&((-75>=data[i].rsrp)&&(-85<=data[i].rsrp))){
                    dat.push(data[i]) 
                  
                  } 
                }
                if (criteria.color=="green"){
                  if ((data[i].mobilegeneration=="3G")&&((0>=data[i].rsrp)&&(-75<=data[i].rsrp))){
                    dat.push(data[i]) 
                  
                  } 
                }
    }  
      
    var featurespkijson=[]
    for (var i = 0; i < dat.length; i++) {
      //alert(celular.length)
        // for (var i = 1; i < data.length; i++) {
     
         // console.log(celular.length)
         //if (data[i].timestamp.substr(0,5)=='10/28'){
             
             featurespkijson.push(
                 {
                    "type":"Feature",
                    "properties":{"nombre":dat[i].mobilegeneration},                             
                    "geometry":{"type":"Point","coordinates":[dat[i].lon,dat[i].lat] }
               }
              )
           // }
      }  
      let pkijson={
       "type":"FeatureCollection",
       "features":featurespkijson
     }
    // alert(featurespkijson.length)
    callback(pkijson)
      
}

var filtro=
[
    {
  "kpi":"3G",
  "color":[
      {"color":"green","rsrp":[0,-85],"sinr":[20,0],"rsrq":[0,-9],"cqi":[10,16]},
      {"color":"yellow","rsrp":[-85,-100],"sinr":[10,20],"rsrq":[-9,-12],"cqi":[7,10]},
      {"color":"orange","rsrp":[-100,-110],"sinr":[5,10],"rsrq":[-12,-15],"cqi":["NA","NA"]},
      {"color":"red","rsrp":[-110,-150],"sinr":[10,0],"rsrq":[-15,-9999],"cqi":[0,7]}

  ]
    },
    {
        "kpi":"4G",
        "color":[
            {"color":"green","rscp":[0,-75],"ec/no":[0,-9],"rssi":[0,-66]},
            {"color":"yellow","rscp":[-75,-85],"ec/no":[-9,-12],"rssi":[-66,-73]},
            {"color":"orange","rscp":[-85,-95],"ec/no":[-12,-15],"rssi":[-73,-80]},
            {"color":"red","rscp":[-95,-150],"ec/no":[-15,-9999],"rssi":[-80,-9999]}
           
        ]
          }
]