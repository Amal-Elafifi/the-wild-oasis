import { createContext, useContext, useEffect } from "react";
import{useLocalStorageState} from "../../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({children}){
    const[isDark, setIsDark] = useLocalStorageState(false, "isDark")

    useEffect(function(){
        if(isDark){
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");            
        }else{
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        }
    },[isDark])

    function toggleDarkMode(){
        setIsDark((isDark) => !isDark)
    }

    return(
        <DarkModeContext.Provider value={{isDark, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkModeContext(){
    const context = useContext(DarkModeContext);
    if(context === undefined) throw new Error("DarkModeProvider is used outside the DarkModeContext");
    return context;
}

export {DarkModeProvider, useDarkModeContext};