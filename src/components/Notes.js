import React ,{useContext}from "react";
import NoteContext from '../context/notes/NoteContext'
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
const Notes = () => {

    const context=useContext(NoteContext);
    const {notes,addNote}=context;

  return (
    <div className="row my-3">
        <AddNote/>
      <h1> Your Notes</h1>

      {/* Fetch all notes from json in NoteState */}
        {notes.map((note) => {
            return <Noteitem note={note} />;
        })}
    </div>
  );
};

export default Notes;
