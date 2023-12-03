const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const { info, error } = require('./utils/logger');
const cors = require('cors')
const notesRouter = require('./controllers/notes')

//middleware
app.use(cors());
app.use(express.json())

app.use('/api/notes', notesRouter)

module.exports = app;