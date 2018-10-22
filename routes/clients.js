'use strict';

// Load express, create a router from express(), load two models:
// Admin Model
// Client Model

let express = require('express');
let router = express.Router();
let Product = require('../models/product');
let Client = require('../models/client');
let Cart = require('../models/cart');

// Index Route for the Client view in this application.
// A client will load the home page and see the site home page
// in its normal state. The INDEX ROUTE below will redirect to the 
// /home route which in turn will load the home page of the web application, 
// Client View.
router.get('/', (req, res, next) => {
    res.redirect('/home');
})

//======================================

// Index Route Redirect which will load the home page of the web application
// As stated above. This again is what the Client will be seeing, home page
router.get('/home', (req, res, next) => {
    let successMsg = req.flash('success')[0];
    res.render("clients/index", {successMsg: successMsg, noMessage: !successMsg}); // Client rendering home page is within the views/clients/index.ejs (EJS is the templating agent for this application) directory
})

//======================================


// About Route will load the about page of the web application
// In reference to the above index route, || home page. The /about route loads
// the web application data relating to the about link listed in the partials/header directory
router.get("/about", (req, res, next) => {
    res.render("clients/about");
})

//======================================

router.get('/contact', function(req, res, next) {
    res.render('clients/contact');
})

// /products (PLEASE NOTE THIS IS PLURAL NAMING CONVENTION). We are retrieving all of products uploaded by admin (Blake Lewis)
// allowing the page to render all the products in a list view. This view is again in EJS and able to sort through records as a client
// with an external javascript file. This file is found in the html || public directory in assets/js/sort.js file. The client will see
// every product uploaded from the administration panel.
router.get("/products", (req, res, next) => {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.find({}, function(err, products) {
        let productChunks = [];
        let chunkSize = 3;
        for(let i = 0; i < products.length; i += chunkSize) {
            productChunks.push(products.slice(i, i + chunkSize));
        }
        if(err) {
            console.log(err);
        } else {
            res.render("clients/products", {products: products, cart: cart}) // products ID is stored in the key value pair, 'products'
        }
    })
})

// We are now getting ONE product with the product ':id', the EJS page will load for that specific product with description, price,
// links to share the product via email and facebook. Clients will be able to go back to view all prodcuts to sort, view, read descriptions
// and continue, eventually to the checkout process. Their shopping cart!
router.get("/products/:id", (req, res, next) => {
    Product.findById(req.params.id, function(err, productFound) {
        if(err) {
            console.log(err);
        } else {
            res.render("clients/show", {product: productFound});
        }
    })
})

// Get Client and display order time in client show page
router.get("/orders", (req, res, next) => {
    Client.findById(req.params.id).populate("orders").exec(function(err, orderFound) {
        if(err) {
            console.log(err);
        } else {
            res.render("clients/orders", {order: orderFound})
        }
    })
})


module.exports = router;