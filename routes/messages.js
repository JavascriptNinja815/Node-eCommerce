'use strict'

let express = require('express');
let router = express.Router();
let Message = require('../models/message');

router.get('/contact', function(req, res, next) {
    res.render("clients/contact");
})

router.post('/contact', function(req, res, next) {
    let message = {
        name: req.body.nameFirst,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message,
        subject: req.body.subject
    }
    Message.create(message, function(err, message) {
        if(err) {
            console.log(err);
        } else {
            res.render("clients/contact-success");
        }
    })
})

module.exports = router;