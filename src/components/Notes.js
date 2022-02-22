import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from '../context/notes/NoteContext'
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
const Notes = () => {

  const context = useContext(NoteContext);
  const { notes, getNotes ,editNote} = context;

  useEffect(() => {
    getNotes()
// eslint-disable-next-line 
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    
    setnote({ id:currentNote._id ,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }

      const handleClick=(e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
    }

    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (



    <div className="row my-3">
      <AddNote />

      {/*  Bootstrap modal start */}

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">



              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label" >Title</label>
                  <input type="text" className="form-control" id="title" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="edescription" value={note.edescription} onChange={onChange} />
                </div>


                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>




            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button> 
            </div>
          </div>
        </div>
      </div>
      {/* Bootstrap modal end  */}



      <h1> Your Notes</h1>

      {/* Fetch all notes from json in NoteState */}
      {notes.map((note) => {
        return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
      })}
    </div>

  );
};

export default Notes;
