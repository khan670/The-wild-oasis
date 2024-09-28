import { useEffect, useRef } from "react";

export function useClose(close, isCapturing=true){
    const refs=useRef();
    useEffect(function(){
      function handleClose(e){
        if(refs.current&&!refs.current.contains(e.target)) {
       
          close();
        }
  
      }
      document.addEventListener('click',handleClose,isCapturing);
      return ()=> document.removeEventListener('click',handleClose,isCapturing);
    },[close,isCapturing])
    return {refs};
}