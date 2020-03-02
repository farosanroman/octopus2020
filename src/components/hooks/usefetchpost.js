import { useState, useEffect } from "react";
export const useFetchPost = (url,message) => {
    const [dataPost, setDataPost] = useState();
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [isErrorPost, setIsErrorPost] = useState(false);
  
   // url="https://faronosql.azurewebsites.net/api/VinotintoPostOauth?code=qnaytKAJlMzrAPNmn4SLxavP6JKqWqA2fpxNzvxbra8k4yJCTmQeIQ=="
   // message={id:"id",ppa:123,"ppb":2222}
    const postData = async (url,message) => {
        //alert("url"+url)
        setIsErrorPost(false);
        setIsLoadingPost(true);
    try {
    const config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
            body: JSON.stringify(message)
          }
  
         const response = await fetch(url,config);
         const data = await response.json();
         //alert("POST RESPONSE"+JSON.stringify(data))
         setDataPost(data);
          setIsErrorPost(false);
          setIsLoadingPost(false);

    } catch (error) {
        //alert("error")
            setIsErrorPost(true);
           setIsLoadingPost(false);
    }
        
};

    useEffect(() => {
      //  alert("useEffect",url)
      postData(url,message);
      setIsErrorPost(false);
      setIsLoadingPost(false);
     
    }, [url,message]);
    
    return  [ dataPost, isLoadingPost, isErrorPost , postData];
}

//https://itnext.io/how-to-create-react-custom-hooks-for-data-fetching-with-useeffect-74c5dc47000a <==WUAO
//https://hooks-guide.netlify.com/
//const data = useFetch("http://faro2018personas.azurewebsites.net/api/faroreapi_getpersonare?identificacion=V21119337");
//ss  const data2 = useFetchPost("https://geofaro.azurewebsites.net/api/VinoTintoPostPersona?code=YAP4o9atasiNoeX/seAll5TsVA99bCsaaVO68XsnNoHHZ4YZ3UStQQ==",{ppa:"123",ppp:"ppa"});
 //OTO EJEMPLO CON falg is loading  https://medium.com/@cwlsn/how-to-fetch-data-with-react-hooks-in-a-minute-e0f9a15a44d6
 //otro gran ejemplo https://codesandbox.io/s/nostalgic-hopper-qsl0p+ 
//https://tannerlinsley.com/blog/react-hooks-the-rebirth-of-state-management teoria
//https://hooks-guide.netlify.com/
//en click
