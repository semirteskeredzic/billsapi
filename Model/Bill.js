const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const BillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    arrival: {
        type: Boolean,
        default: false
    },
    dateOfArrival: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    utilityCompany: {
        type: String,
        default: 'None'
    },
    dateOfPayment: {
        type: Date
    },
    previousDebt: {
        type: Number,
        default: 0
    },
    user: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Bill', BillSchema)