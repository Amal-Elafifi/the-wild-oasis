import { useEffect } from "react";

function useClickOutside(handler, ref, listenCapturing= true){
    useEffect(function(){
  
      function handleClick(e){
          if(ref.current && !ref.current.contains(e.target)){
            console.log("click outside");
            handler();
          }
      }
  
      document.addEventListener("click", handleClick, listenCapturing);
  
      return ()=> document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing, ref])
}
export default useClickOutside;