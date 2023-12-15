const mongoose = require('mongoose')

// define a schema

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    userName: String,
    passwordHash: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
})
module.exports = mongoose.model('User', userSchema, 'users')