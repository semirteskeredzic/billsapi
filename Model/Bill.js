const mongoose = require('mongoose')

const BillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
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
    paid: {
        type: Boolean,
        default: false
    },
    dateOfPayment: {
        type: Date
    },
    previousDebt: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Bill', BillSchema)