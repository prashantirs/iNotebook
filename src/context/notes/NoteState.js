import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const note = [ ];

  const [notes, setNotes] = useState(note);

  //Get all note
  const getNotes = async() => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMTRlMjdiY2YxOGExODkwMGVkYTk4In0sImlhdCI6MTY0NTM4MDg3OX0.ycHwi-t6cLX78vVyKkgFxPEGPwxeG6lYXbdxRo9Jlm0",
      }
    });
    const json =await response.json();
    setNotes(json);
  };
  

  //Add note
  const addNote = async(title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMTRlMjdiY2YxOGExODkwMGVkYTk4In0sImlhdCI6MTY0NTM4MDg3OX0.ycHwi-t6cLX78vVyKkgFxPEGPwxeG6lYXbdxRo9Jlm0",
      },

      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    
    //check
    console.log(json);
    
    const note = {
      _id: "62128fc1c096325976e2e9bd",
      user: "62114e27bcf18a18900eda98",
      title: title,
      description: description,
      tag: tag,
      date: "2022-02-20T19:00:17.298Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete note
  const deleteNote = async(id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMTRlMjdiY2YxOGExODkwMGVkYTk4In0sImlhdCI6MTY0NTM4MDg3OX0.ycHwi-t6cLX78vVyKkgFxPEGPwxeG6lYXbdxRo9Jlm0",
      },
    });
    const json = await response.json();

    //check
    console.log(json)

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //Edit note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMTRlMjdiY2YxOGExODkwMGVkYTk4In0sImlhdCI6MTY0NTM4MDg3OX0.ycHwi-t6cLX78vVyKkgFxPEGPwxeG6lYXbdxRo9Jlm0",
      },

      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();

    //check
    console.log(json)

    let newNotes=JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if ((element._id === id)) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
