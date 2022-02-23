import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {

  const context=useContext(NoteContext);
  const {deleteNote}=context;

  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3 ">
        <div className="card-body ">
          <div className="d-flex">
            <h5 className="card-title ">{note.title}</h5>
            {/* <i className="far fa-trash-alt"></i> */}
            <i className="fas fa-trash mx-2 my-1" onClick={()=>{
              deleteNote(note._id);
             props.showAlert("Deleted Your Note","warning")
             }}>

             </i>
            <i className="fas fa-edit mx-2 my-1" onClick={()=>{updateNote(note)}}></i>
            
          </div>
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
