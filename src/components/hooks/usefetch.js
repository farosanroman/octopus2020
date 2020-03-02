import { useState, useEffect } from "react";
//https://itnext.io/how-to-create-react-custom-hooks-for-data-fetching-with-useeffect-74c5dc47000a <==WUAO
//https://hooks-guide.netlify.com/
//const data = useFetch("http://faro2018personas.azurewebsites.net/api/faroreapi_getpersonare?identificacion=V21119337");
//ss  const data2 = useFetchPost("https://geofaro.azurewebsites.net/api/VinoTintoPostPersona?code=YAP4o9atasiNoeX/seAll5TsVA99bCsaaVO68XsnNoHHZ4YZ3UStQQ==",{ppa:"123",ppp:"ppa"});
 //OTO EJEMPLO CON falg is loading  https://medium.com/@cwlsn/how-to-fetch-data-with-react-hooks-in-a-minute-e0f9a15a44d6
 //otro gran ejemplo https://codesandbox.io/s/nostalgic-hopper-qsl0p+ 
//https://tannerlinsley.com/blog/react-hooks-the-rebirth-of-state-management teoria
//https://hooks-guide.netlify.com/
//en click
export const useFetch = (url) => {

 
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    //const [option, setOption] = useState("");
  //alert("useFetch")
  
  //useEffect(() => {
  // fetchData(url);
 //}, [url]);
    // Just pass the variables that changes in each new fetch requisition
    const fetchData = async (url2) => {
        
        setIsError(false);
        setIsLoading(true);
        try {
          //const response = await axios.get(url);
        //  alert(url)
          const response = await fetch(url2);        
          const data = await response.json();
          //alert(url2+ " useFetch www " +JSON.stringify(data))  
          setData(data);
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };
  
  
    return [ data, isLoading, isError , fetchData];
  };
 // // fetchData('https://openfaroapi.azurewebsites.net/api/personaget?identificacion='+callback[0].cedula)
  
 
      //https://stackoverflow.com/questions/57701733/how-to-correctly-call-usefetch-function
     //https://stackoverflow.com/questions/57701733/how-to-correctly-call-usefetch-function
     //const onBlur = () => {
     //    const [{ data, isLoading, isError }] = useFetch(
     //      'http://some_api_endpoint_path'
     //    );
     //    ...
     //  }
  