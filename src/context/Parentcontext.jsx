import React, { createContext,useState } from "react";

export const AppContext=createContext();

const Parentcontext=({children})=>{
    const[state,setState]=useState("");
    const[isBlur,setIsBlur]=useState(true);
    return(
        <AppContext.Provider value={{state,setState,isBlur,setIsBlur}}>
        {children}
        </AppContext.Provider>
    )

}

export default Parentcontext;