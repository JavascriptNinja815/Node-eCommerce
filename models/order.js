'use strict';

let mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: Object,
        required: true
    },
    nameFirst: {
        type: String,
    },
    nameLast: {
        type: String,
    },
    addressStreet: {
        type: String,
    },
    addressSuite: {
        type: String,
    },
    addressCity: {
        type: String,
    },
    addressState: {
        type: String,
    },
    addressPostal: {
        type: String,
    },
    rate: {
        type: String
    },

    totalPrice: {
        type: String
    },

    item: {
        type: String
    },
    paymentId: {
        type: String,
        // Required later on...
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Order", OrderSchema);