const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const UserSchema = new mongoose.Schema({
    userId: {
        type: number
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    role: {
        type: String,
        default: "primaryUser"
    },
    connectedUser: {
        type: ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema)