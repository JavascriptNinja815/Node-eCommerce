'use strict';

let mongoose = require('mongoose');

let ClientSchema = new mongoose.Schema({
    nameFirst: String,
    nameLast: String,
    email: String,
    id: String,
    addressState: String,
    addressStreet: String,
    addressCity: String,
    addressSuite: String,
    postalCode: String,
    phone: String,
    clientCode: String,
    clientPurchase: String,
    totalCost: String
})

module.exports = mongoose.model("Client", ClientSchema);