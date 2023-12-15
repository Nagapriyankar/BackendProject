const mongoose = require('mongoose');

// define a schema
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Note', noteSchema, 'notes');