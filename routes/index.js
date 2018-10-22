'use strict';

let express = require('express');
let router = express.Router();
let Product = require('../models/product');
let Client = require('../models/client');
let Cart = require('../models/cart');
let shippo = require('shippo')('shippo_live_f15203e2b69bba014a4c517fc37bda82f8a603d6');

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {}, req.body.height, req.body.length, req.body.width, req.body.weight);
    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        if ((!req.session.cart) || (req.session.cart && (Object.keys(req.session.cart.items).length == 0))){
            cart.add(product, product.id);
            req.session.cart = cart;
        }
        res.redirect('/shopping-cart');
    });
});

router.get('/shopping-cart', function(req, res, next) {
    if(!req.session.cart) {
        return res.render('clients/shopping-cart', {products: null});
    }

        let cart = new Cart(req.session.cart);
        res.render('clients/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
     });

router.get('/remove/:id', function(req, res, next) {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    if(req.session.cart) {
        req.session.cart = cart;
    } else {
        req.session.cart = null;
    }
    res.redirect('/products');
})

router.get("/cart-shipping", isLoggedIn, function(req, res, next) {
    if(!req.session.cart) {
        return res.render("clients/shopping-cart", {products: null} )
    }

    let cart = new Cart(req.session.cart);
    res.render('clients/new-checkout', {products: cart.generateArray(), totalPrice: cart.totalPrice, weight: cart.weight})
});


router.post('/cart-checkout', isLoggedIn, function(req, res, next) {
    let cart = new Cart(req.session.cart);

    if(!req.session.cart) {
        return res.redirect('/shopping-cart');
    }

    let client = new Client({
        nameFirst: req.body.nameFirst,
        nameLast: req.body.nameLast,
        addressStreet: req.body.addressStreet,
        addressSuite: req.body.addressSuite,
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        postalCode: req.body.postalCode,
        phone: req.body.phone,
        email: req.body.email
    })

client.save(function(err, savedClient){
    if(err) {
        console.log(err);
    } else {
        // Shippo Information
        let addressFrom = {
            "name":"Blake Johnston Lewis",
            "company":"Tidepool Aquatics",
            "street1":"1210 Piedra Morada Drive",
            "city":"Pacific Palisades",
            "state":"CA",
            "zip":"90272",
            "country":"US",
            "phone":"+1 310 600 4816",
            "email":"BlakeLewis1998@Gmail.com",
        }
        
        var addressTo = {
            "name": req.body.nameFirst,
            "street1": req.body.addressStreet,
            "street2": req.body.addressSuite,
            "city": req.body.addressCity,
            "state": req.body.addressState,
            "zip": req.body.postalCode,
            "country":"US",
            "phone": req.body.phone,
            "email": req.body.email
        }
        
        let parcel = {
            "length": req.body.length,
            "width": req.body.width,
            "height": req.body.height,
            "distance_unit":"in",
            "weight": req.body.weight,
            "mass_unit":"lb",
        }
        
        shippo.shipment.create({
          "address_from": addressFrom,
          "address_to": addressTo,
          "parcels": [parcel],
          "async": false
        })
        // Put inshipping here to see if hte rate does not stall
        
        .then(function(shipment) {
            shippo.shipment.rates(shipment.object_id)
            .then(function(rates) {
                // Shipping on Wednesday and Friday
                    let overnight =[];
                    for(let i = 0; i < rates.results.length; i++) {
                        if(rates.results[i].servicelevel.token === 'fedex_priority_overnight') {
                            overnight.push(rates.results[i].amount);
                        } else {
                            console.log("Priorty Overnight could not be found!");
                        }
                    }
                    console.log(overnight);
            cart.rate = parseFloat(overnight);
            let totalCostOfCart = parseFloat(cart.totalPrice) + parseFloat(cart.rate);
            res.render("clients/new-payment", {products: cart.generateArray(), rate: cart.rate, totalCostOfCart: cart.totalCostOfCart, totalPrice: cart.totalPrice, cart: cart, totalCostOfCart: totalCostOfCart, client: client});  
            console.log(savedClient + " AND ! " + (overnight)); // I think this console statement fixes the callback issue with rates not calculating!
        
                }).catch(function(err) {
                // Deal with an error
                console.log("There was an error retrieving rates : %s", err);
                res.redirect("/shopping-cart");
            })
        }).catch(function(err) {
          console.log("This is an error!: " + err);
        });
    }
})

});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/register');
}
