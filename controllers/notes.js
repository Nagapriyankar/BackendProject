const notesRouter = require('express').Router();
const Note = require('../models/note');

// endpoint to get all the notes
notesRouter.get('/', (request, response) => {
    Note.find({}, {})
        .then(notes => {
            response.status(200).json(notes);
        })
});

//query param to get all notes
notesRouter.get('/query', (request, response) => {
    console.log(request.query)
    console.log(request.query.id)
    console.log(request.query.browser)
    response.status(200).send(request.query)
 })

// endpoint to create a new resource/note based on the request data
notesRouter.post('/', (request, response) => {
    const note = new Note(request.body);

    note.save()
        .then(() => {
            response.status(201).json({ message: note });
        });
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