const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user')
const {verifyToken} = require('../middlewares/auth')

// endpoint to get all the notes
notesRouter.get('/', verifyToken,  async(request, response) => {

    //get userId from requst object 
    const userId = request.userId

    //if token is valid, get the user who created the notes and populate notes array to view all notes created by the user
    const user = await User
        .findById(userId)
        .select('_id userName name createdAt updatedAt notes')
        .populate('notes', { user: 0, __v: 0 })

    //send the user details to response
    response.json(user.notes)


});


// endpoint to create a new resource/note based on the request data
notesRouter.post('/', verifyToken, async(request, response) => {
   
    //get userId from requst object 
    const userId = request.userId

    //if token is valid, get the user who created
    const user = await User.findById(userId)

    //create  a new note object
    const note = new Note({
        content: request.body.content,
        important: request.body.important || false,
        user: user._id
        
    })

    //save thenote to the database
    const savedNote = await note.save()

    //add thenote id to the user's note array property
    user.notes = user.notes.concat(savedNote._id)

    //save thr updated user Object to the database
    await user.save()

    //
    response.json({
        message: 'note created successful', note: savedNote
    
    })
});

// endpoint to fetch a single note/resource based on id
notesRouter.get('/:id', (request, response) => {
    // get the id from the params
    let id = request.params.id;

    Note.findById(id)
        .then(note => {
            response.status(200).json(note);
        })
        .catch(err => {
            response.status(404).json({ message: 'id does not exist' });
        });
});

// endpoint to delete a single resource based on id
notesRouter.delete('/:id', (request, response) => {
    const id = request.params.id;

    Note.findByIdAndDelete(id)
        .then(deleteNote => {
            if (deleteNote) {
                response.status(204).json({ message: 'note deleted successfully' });
            }
        });
});

// endpoint to replace the entire note object identified by an id
notesRouter.put('/:id', (request, response) => {
    const id = request.params.id;
    const noteToUpdate = request.body;

    Note.findByIdAndUpdate(id, noteToUpdate)
        .then(updatedNote => {
            if (updatedNote) {
                response.status(200).json({ message: 'note replaced successfully' });
            } else {
                response.status(404).json({ message: 'id does not exist' });
            }
        });
});

// endpoint to update a single property of a note object identified by an id
notesRouter.patch('/:id', (request, response) => {
    const id = request.params.id;
    const noteToPatch = request.body;

    Note.findByIdAndUpdate(id, noteToPatch)
        .then(updateNote => {
            console.log(updateNote)

            if (updateNote) {
                response.status(200).json({ message: 'note patched successfully' });
            } else {
                response.status(404).json({ message: 'id does not exist' });
            }
        });
});


module.exports = notesRouter;