import { useState,useEffect } from "react";

const useFetch = (url) => {
    const abortCont= new AbortController();
    const [data,setData]=useState(null);
    const [isPending,setIsPending]=useState(true);
    const[error,setError]=useState(null);
    useEffect(
        ()=>{
            setTimeout(()=>{
                fetch(url,{signal:abortCont.signal})
                .then(res=>{
                    if(!res.ok){
                        throw Error("coudnt fetch the data ");
                    }
                    return res.json();
                })
                .then(data=>{
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err=>{
                    setIsPending(false);
                    setError(err.message);
                })
            },1000)

        },[]
    )
    //return ()=>abortCont.abort();
    return {data,isPending,error };
}

export default useFetch;