'use strict';

let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    image: {
        id: String,
        url: String
    },
   qty: {
       type: Number,
       required: true,
   },

    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    width: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Product", ProductSchema);

