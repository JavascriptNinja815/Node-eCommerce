'use strict';

let express = require('express');
let router = express.Router();
let Cart = require('../models/cart');
let Order = require('../models/order');
// let shippo = require('shippo')('shippo_test_7c1fae331db3a0089ca9c3649522ecd7d18a2564');


router.get('/successful-checkout', function(req, res, next) {
  res.render('clients/orderComplete');
})

router.post('/final-checkout', isLoggedIn, function(req, res, next) {
  let cart = new Cart(req.session.cart);
  let braintree = require("braintree");
let gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "kjxtbhnsh26j2ww8",
  publicKey: "s2yg7cx97zh425wk",
  privateKey: "60281cb6e4495cf4978596ba794449fc"
});
        // Create a new transaction for $12
        gateway.transaction.sale({ //  
          amount: req.body.rate,
          paymentMethodNonce: req.body.payment_method_nonce,
          options: {
            // This option requests the funds from the transaction
            // once it has been authorized successfully
            submitForSettlement: true
          }
        }, function(error, result) {
            if (result.success) {
              // Create an order!
              let order = new Order({
                user: req.user,
                cart: cart,
                nameFirst: req.body.nameFirst,
                nameLast: req.body.nameLast,
                addressStreet: req.body.addressStreet,
                addressSuite: req.body.addressSuite,
                addressCity: req.body.addressCity,
                addressState: req.body.addressState,
                postalCode: req.body.postalCode,
                phone: req.body.phone,
                email: req.body.email,
                rate: req.body.rate,
                totalPrice: cart.totalPrice,
                item: cart.item,
                paymentId: result.transaction.id,
                tracking: cart.tracking,
              })

              order.save(function(err, orderSaved) {
                if(err) {
                  console.log("Error saving order to the database " + err);
                  redirect('/shopping-cart');
                } else {
                  req.session.cart = null;
                  res.redirect('/successful-checkout');
                }
              })
            } else {
              let transactionErrors = result.errors.deepErrors();
              console.log(transactionErrors);
              
            }
        
        });
});
/*
Shipping label creation logic if indeed blakes wants labels to generate automatically

                  req.flash('success', 'Successfully Bought Product!');
                  let productId = req.params.id
                  Product.findByIdAndRemove(productId, function(err) {
                    if(err) {
                      return res.redirect('/');
                    }
                  })

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
                }, function(err, shipment) {
                  let rate;
                  for(let i = 0; i < shipment.rates.length; i++) {
                    rate = shipment.rates[i];
                  }
                  console.log("This is the rate! "  + rate);
                  console.log("This is the object Id " + rate.object_id);
                      shippo.transaction.create({
                        "rate": rate,
                        "label_file_type": "PDF",
                        "async": false
                      }, function(err, transaction) {
                          if(err) {
                            console.log(err);
                          } else {
                            cart.tracking = transaction.tracking_url_provier;
                            cart.label = transaction.label_url;
                            console.log("Success James!");
                          }
                      });
})
*/

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/user/register');
}
