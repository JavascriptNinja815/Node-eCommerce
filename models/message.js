'use strict';

let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String
})

module.exports = mongoose.model("Message", MessageSchema);