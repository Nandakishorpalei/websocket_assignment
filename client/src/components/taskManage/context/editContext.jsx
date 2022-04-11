import { createContext, useState } from "react";


export const ShowContext = createContext();

export const ShowContextProvider = ({children})=>{
     const [willShow, setWillShow] = useState(false);
    
     function updateWillShow(value){
        console.log("value",value)
        setWillShow(value)
     }

    return <ShowContext.Provider value={{willShow, updateWillShow}}>{children}</ShowContext.Provider>
}