import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3 ">
        <div className="card-body ">
          <div className="d-flex">
            <h5 className="card-title ">{note.title}</h5>
            {/* <i className="far fa-trash-alt"></i> */}
            <i className="fas fa-trash mx-2 my-1"></i>
            <i className="fas fa-edit mx-2 my-1"></i>
            
          </div>
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
