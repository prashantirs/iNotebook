const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

//express validator
const { body, validationResult } = require('express-validator');

//Route 1 Get All Notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
    
})


//Route 2 Add All Notes
router.post('/addnotes', fetchuser, [

    body('title', 'Enter a valid title').isLength({ min: 2 }),
    body('description', 'Enter description of min  length 5').isLength({ min: 5 }) ], async (req, res) => {

  
    try {
        const {title,description,tag}=req.body   
        //any error occured send bad request --->express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const saveNote=await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

//Route 3 Update /api/notes/updatenotes eg(http://localhost:5000/api/notes/updatenotes/62128f1ac096325976e2e9bb)
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const {title,description,tag}=req.body 

    try {
        //Create a newNote
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the note to be updated and update it
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
    
})

//Route 4 Delete /api/notes/deletenotes eg(http://localhost:5000/api/notes/deletenotes/62128f1ac096325976e2e9bb)
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    const {title,description,tag}=req.body 

    try {
    
    //Find the note to be deleted and delete it
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
    
})
module.exports = router;