import React, { Fragment, useState,useEffect } from "react";
import { ResponsiveCalendar } from '@nivo/calendar'

import {useFetch} from '../hooks/usefetch';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

  function GeoCalendar(props) {
   // const [data, isLoading, isError , fetchData] = useFetch("");

    const[dates,setDate]=useState(props.days)

  function clickCalendar(day,event)  {
   // alert(JSON.stringify(day))
    props.clickday(day.day)
   // alert(JSON.stringify(day))
  }
return (
<ResponsiveCalendar
        data={dates}
        from="2020-02-01"
        to="2020-12-31"
        emptyColor="#eeeeee"
        colors={[ 'dodgerblue' ]}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        yearSpacing={20}
        monthBorderWidth={1}
        monthBorderColor="gray"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      
        onClick={clickCalendar}
        yearLegendOffset={25}
    />
)
    }
    export default GeoCalendar;
    var data2=
    [{"day":"2018-10-02","value":0},{"day":"2018-10-03","value":0},{"day":"2018-10-04","value":0},{"day":"2018-10-05","value":0},{"day":"2018-10-06","value":0},{"day":"2018-10-07","value":0},{"day":"2018-10-08","value":0},{"day":"2018-10-09","value":0},{"day":"2018-10-10","value":0},{"day":"2018-10-11","value":0},{"day":"2018-10-13","value":0},{"day":"2018-10-14","value":0},{"day":"2018-10-17","value":0},{"day":"2018-10-18","value":0},{"day":"2018-10-19","value":0},{"day":"2018-10-20","value":0},{"day":"2018-10-22","value":0},{"day":"2018-10-23","value":0},{"day":"2018-10-25","value":0},{"day":"2018-10-27","value":0},{"day":"2018-10-28","value":0},{"day":"2018-10-30","value":0},{"day":"2018-10-31","value":0},{"day":"2018-11-01","value":0},{"day":"2018-11-02","value":0},{"day":"2018-11-03","value":0},{"day":"2018-11-04","value":0},{"day":"2018-11-05","value":0},{"day":"2018-11-06","value":0},{"day":"2018-11-07","value":0},{"day":"2018-11-08","value":0},{"day":"2018-11-09","value":0},{"day":"2018-11-10","value":0},{"day":"2018-11-11","value":0},{"day":"2018-11-12","value":0},{"day":"2018-11-13","value":0},{"day":"2018-11-14","value":0},{"day":"2018-11-15","value":0},{"day":"2018-11-16","value":0},{"day":"2018-11-17","value":0},{"day":"2018-11-18","value":0},{"day":"2018-11-19","value":0},{"day":"2018-11-30","value":0},{"day":"2018-12-01","value":0},{"day":"2018-12-02","value":0},{"day":"2018-12-03","value":0},{"day":"2018-12-04","value":0},{"day":"2018-12-18","value":0},{"day":"2018-12-19","value":0},{"day":"2018-12-20","value":0},{"day":"2018-12-21","value":0},{"day":"2018-12-22","value":0}]
     // [{"day":"2018-10-28","value":0},{"day":"2018-10-27","value":0},{"day":"2018-12-20","value":0},{"day":"2018-12-21","value":0},{"day":"2018-12-19","value":0},{"day":"2018-12-18","value":0},{"day":"2018-12-22","value":0},{"day":"2018-11-5","value":0},{"day":"2018-11-14","value":0},{"day":"2018-11-1","value":0},{"day":"2018-11-02","value":0},{"day":"2018-11-15","value":0},{"day":"2018-10-30","value":0},{"day":"2018-10-31","value":0},{"day":"2018-11-3","value":0},{"day":"2018-11-13","value":0},{"day":"2018-11-12","value":0},{"day":"2018-11-6","value":0},{"day":"2018-11-8","value":0},{"day":"2018-11-7","value":0},{"day":"2018-11-4","value":0},{"day":"2018-11-9","value":0},{"day":"2018-11-17","value":0},{"day":"2018-11-19","value":0},{"day":"2018-11-16","value":0},{"day":"2018-11-18","value":0},{"day":"2018-10-8","value":0},{"day":"2018-10-6","value":0},{"day":"2018-10-9","value":0},{"day":"2018-10-11","value":0},{"day":"2018-10-7","value":0},{"day":"2018-10-5","value":0},{"day":"2018-10-10","value":0},{"day":"2018-10-17","value":0},{"day":"2018-10-18","value":0},{"day":"2018-10-19","value":0},{"day":"2018-10-13","value":0},{"day":"2018-10-4","value":0},{"day":"2018-10-20","value":0},{"day":"2018-10-14","value":0},{"day":"2018-10-25","value":0},{"day":"2018-10-23","value":0},{"day":"2018-10-22","value":0},{"day":"2018-11-10","value":0},{"day":"2018-11-11","value":0},{"day":"2018-10-3","value":0},{"day":"2018-10-2","value":0},{"day":"2018-12-4","value":0},{"day":"2018-12-2","value":0},{"day":"2018-12-1","value":0},{"day":"2018-12-3","value":0},{"day":"2018-11-30","value":0}]
 //   {"day":"2018-10-28","value":0},{"day":"2018-10-27","value":0},{"day":"2018-12-20","value":0},{"day":"2018-12-21","value":0},{"day":"2018-12-19","value":0},{"day":"2018-12-18","value":0},{"day":"2018-12-22","value":0},{"day":"2018-11-05","value":0},{"day":"2018-11-14","value":0},{"day":"2018-11-01","value":0},{"day":"2018-11-02","value":0},{"day":"2018-11-15","value":0},{"day":"2018-10-30","value":0},{"day":"2018-10-31","value":0},{"day":"2018-11-03","value":0},{"day":"2018-11-13","value":0},{"day":"2018-11-12","value":0},{"day":"2018-11-06","value":0},{"day":"2018-11-08","value":0},{"day":"2018-11-07","value":0},{"day":"2018-11-04","value":0},{"day":"2018-11-9","value":0},{"day":"2018-11-17","value":0},{"day":"2018-11-19","value":0},{"day":"2018-11-16","value":0},{"day":"2018-11-18","value":0},{"day":"2018-10-08","value":0},{"day":"2018-10-06","value":0},{"day":"2018-10-9","value":0},{"day":"2018-10-11","value":0},{"day":"2018-10-07","value":0},{"day":"2018-10-05","value":0},{"day":"2018-10-10","value":0},{"day":"2018-10-17","value":0},{"day":"2018-10-18","value":0},{"day":"2018-10-19","value":0},{"day":"2018-10-13","value":0},{"day":"2018-10-04","value":0},{"day":"2018-10-20","value":0},{"day":"2018-10-14","value":0},{"day":"2018-10-25","value":0},{"day":"2018-10-23","value":0},{"day":"2018-10-22","value":0},{"day":"2018-11-10","value":0},{"day":"2018-11-11","value":0},{"day":"2018-10-03","value":0},{"day":"2018-10-02","value":0},{"day":"2018-12-04","value":0},{"day":"2018-12-02","value":0},{"day":"2018-12-01","value":0},{"day":"2018-12-03","value":0},{"day":"2018-11-30","value":0}]
 