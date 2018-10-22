'use strict';

let express = require('express');
let router = express.Router();
let Order = require('../models/order');
let Cart = require('../models/cart');
let User = require('../models/user');
let csrf = require('csurf');
let passport = require('passport');

let csrfProtection = csrf();
router.use(csrfProtection);

router.get('/user/profile', isLoggedIn, function(req, res, next) {
    Order.find({user: req.user}, function(err, orders) {
        if(err) {
            console.log("This is the error for not being able to find the correct User! " + err);
            res.write('USER NOT FOUND');
        }
        let cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('clients/profile', {orders: orders});
    })
});

router.get('/user/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
})

router.get("/user/register", function(req, res, next) {
    let messages = req.flash('error');
    res.render("../logInRegister", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
})

router.post("/user/signup", passport.authenticate('local.signup', {
    failureRedirect: '/user/register',
    failureFlash: true
}), function(req, res, next) {
    if(req.session.oldUrl) {
        let oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

router.post("/user/signin", passport.authenticate('local.signin', {
    failureRedirect: '/user/register',
    failureFlash: true
}), function(req, res, next) {
    if(req.session.oldUrl) {
        let oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}