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
    }
})
module.exports = mongoose.model('User', userSchema, 'users')