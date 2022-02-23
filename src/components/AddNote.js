import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
const AddNote = (props) => {

    const context=useContext(NoteContext);
    const {addNote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:"Default"})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.showAlert("Your Note Added","info")
    }

    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
        <h1> Add Note</h1>
            <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label" >Title</label>
            <input type="text" className="form-control" id="title" name="title"  value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
            
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange} minLength={5} required/>
        </div>


        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  onChange={onChange} minLength={5} required/>
        </div>

    

        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        <br/>
    </>
  )
}

export default AddNote;