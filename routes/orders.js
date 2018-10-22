'use strict';

let express = require('express');
let router = express.Router();
let Product = require('../models/product');
let Client = require('../models/client');
let Order = require('../models/order');

// CHECKOUT WITH ONE PRODUCT IN CART
router.get("/checkout/:id", function(req, res) {
    Product.findById(req.params.id).populate("clients").exec(function(err, productCheckout) { // .populate("comments").exec(
        if(err) {
            console.log(err);
        } else {
            res.render("clients/checkout", {product: productCheckout})
        }
    })
  });

// Proceed to redirect which is enabled with logic below. We are finding a product and with it the client associated through purchase.
// This is to redirect to the FINAL PAYMENT page with braintree logic for credti card processing
router.get("/payment/:id", function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct) { // ).populate("clients").exec( || Insert this code if schema design flops
        if(err) {
            console.log(err);
        } else {
            res.render("clients/payment", {product: foundProduct});
        }
    })
})

// Create an order to display in admin panel when checkout payment button has been fired
// This order must consist of
// The product information and reference the client that bought this product/:id as well

router.post("/checkout/:id", function(req, res) {
    let {nameFirst, nameLast, addressStreet, addressSuite, addressCity, addressState, postalCode, productPrice, productDesc, productWeight, productLength, productHeight, productWidth} = {
        nameFirst: req.body.nameFirst,
        nameLast: req.body.nameLast,
        addressStreet: req.body.addressStreet,
        addressSuite: req.body.addressSuite,
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        postalCode: req.body.postalCode,
        productPrice: req.body.price,
        productDesc: req.body.description,
        productWeight: req.body.weight,
        productLength: req.body.length,
        productHeight: req.body.height,
        productWidth: req.body.width
    }
    let clientOrder = {nameFirst, nameLast, addressStreet, addressSuite, addressCity, addressState, postalCode, productPrice, productDesc, productWeight, productLength, productHeight, productWidth }
    Product.findById(req.params.id, function(err, product) {
        if(err) {
            console.log(err);
            res.redirect("/home");
        } else {
            Client.create(clientOrder, function(err, client) {
                if(err) {
                    console.log(err);
                } else {
                    /*
                    product.clients.push(client);
                    product.save();
                    */
                   client.save();
                    res.render("clients/payment", {product: product, client: client});
                }
            })
        }
    })
});

module.exports = router;