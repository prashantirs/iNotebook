import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState=(props)=>{
    const s1={
        "name":"Prashant",
        "class":"12 B"
    }

    const [state, setstate] = useState(s1)

    const update=()=>{
        
        setTimeout(() => {
            setstate({
                "name":"Monu",
                "class":"Tution"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;