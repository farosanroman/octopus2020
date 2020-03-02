import { useState ,useEffect} from "react";

 export const useCalendar = initialCalendar => {
  const [calendar, setCalendar] = useState(initialCalendar);

  const [calendarfiltrado, setCalendarFiltrado] = useState([]);
  
  useEffect(() => {

    var index=[]
    var func=[]
      var f = roles.map((r, i) => {
        if (index.indexOf(r.idfuncional) ==-1) {  
      //      alert(r.idfuncional)
             index.push(r.idfuncional)
             func.push({"idfuncional":r.idfuncional,"funcional":r.funcional})
         //    return {"idfuncional":r.idfuncional,"funcional":r.funcional}
        }
       });
       ///        var pos=roles.findIndex(obj => obj.id==e.target.value);
     setFuncionales(func) 
  },[]);
  //alert(JSON.stringify(initialRoles))
  const handleCalendarFiltro = async (criterio) => {
  //var ff=roles.filter(r => r.idfuncional == idfuncional )
  setCalendarFiltrado([{id:1},{id:2}])
  }
  return [
    calendarfiltrado,
    handleCalendarFiltro
 
  ];
};
