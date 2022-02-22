import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState=(props)=>{
    
    const note=[
        {
          "_id": "62128fc1c096325976e2e9bd",
          "user": "62114e27bcf18a18900eda98",
          "title": "My Title",
          "description": "Please call",
          "tag": "Personal",
          "date": "2022-02-20T19:00:17.298Z",
          "__v": 0
        },
        {
          "_id": "62128fc1c096325976e2e9bd",
          "user": "62114e27bcf18a18900eda98",
          "title": "My Title",
          "description": "Please call",
          "tag": "Personal",
          "date": "2022-02-20T19:00:17.298Z",
          "__v": 0
        },
        {
          "_id": "62128fc1c096325976e2e9bd",
          "user": "62114e27bcf18a18900eda98",
          "title": "My Title",
          "description": "Please call",
          "tag": "Personal",
          "date": "2022-02-20T19:00:17.298Z",
          "__v": 0
        },
        {
          "_id": "62128fc1c096325976e2e9bd",
          "user": "62114e27bcf18a18900eda98",
          "title": "My Title",
          "description": "Please call",
          "tag": "Personal",
          "date": "2022-02-20T19:00:17.298Z",
          "__v": 0
        },{
          "_id": "62128fc1c096325976e2e9bd",
          "user": "62114e27bcf18a18900eda98",
          "title": "My Title",
          "description": "Please call",
          "tag": "Personal",
          "date": "2022-02-20T19:00:17.298Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(note)


      //Add note
      const addNote=(title,description,tag)=>{
      const  note={
          "_id": "62128fc1c096325976e2e9bd",
          "user": "62114e27bcf18a18900eda98",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-02-20T19:00:17.298Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }


      //Delete note
      const deleteNote=()=>{
        
      }


      //Edit note
      const editNote=()=>{
        
      }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;