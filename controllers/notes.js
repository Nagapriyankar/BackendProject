const notesRouter = require('express').Router();
const Note = require('../models/note')

//endpoints

notesRouter.get('/api/notes', (request, response) => {
    Note.find({}, {})
        .then(notes => {
            response.status(200).json(notes)
        })
})

module.exports = notesRouter;