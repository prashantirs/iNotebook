//rafce react arrow function component

import React,{ useContext,useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
    const a=useContext(NoteContext);

    useEffect(() => {
       
      a.update();
       // eslint-disable-next-line
    }, [])
    

  return (
    <div className='text-info fw-bold fs-2'> This is About {a.state.name} in {a.state.class}</div>
  )
}

export default About
