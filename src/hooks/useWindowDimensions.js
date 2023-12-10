import { useEffect, useState } from "react"

const getWindowDimensions=()=>({height: window.innerHeight, width: window.innerWidth});

export default function useWindowDimensions(){
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(()=>{
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize',handleResize);
    return ()=>{
      window.removeEventListener('resize',handleResize);
    }
  },[]);

  return windowDimensions;
}
