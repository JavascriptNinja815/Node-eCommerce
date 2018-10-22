'use strict';

let express = require('express');
let router = express.Router();
let multer = require('multer');
let Product = require('../models/product');
let Client = require('../models/client');
let Order = require('../models/order');
let User = require('../models/user');
let cloudinary = require('cloudinary');

/*
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  */

  // =========== Image Upload Configuration =============
//multer config
const storage = multer.diskStorage({
    filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
  });
  const imageFilter = (req, file, cb) => {
      // accept image files only
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
  };
  const upload = multer({ storage: storage, fileFilter: imageFilter});
  
  // cloudinary config
  cloudinary.config({ 
    cloud_name: 'dizynexo7', 
    api_key: 249554149252327, 
    api_secret: 'wmUGSPEc8XxQx4bPQy2pZpJsgvA',
  });

// ADMIN PAGE INDEX - HOME
router.get("/admin", isAdmin, function(req, res,next) {
    Product.find({}, function(err, products) {
        if(err) {
            console.log(err);
        } else {
            Client.find({}, function(err, clients) {
                if(err) {
                    console.log(err);
                } else {
                    Order.find({}, function(err, orders) {
                        if(err) {
                            console.log(err);
                        } else {
                            res.render("admin/home", {products: products, clients: clients, orders: orders})
                        }
                    })
                }
            })
            
        }
    });
})

// This is the route for an admin to load the new product page where a product may be added to Mongo Atlas via a POST request.
// The reason for the .find() method in mongoose is to load the form with values if the admin
// wishes to update the data for a product
router.get("/new", (req, res, next) => {
    Product.find({},function(err, products) { // Retreive photos based off of this tutorial: http://programmerblog.net/nodejs-file-upload-tutorial/
        if(err) {
            console.log(err);
        } else {
            res.render("admin/new", {products: products})
        }
    })
});

// The POST request following the GET 'new' product request.
// This POST request handles data submitted to the form for the 'new' products
// Admin wishes to create and put into the database
router.post("/new", upload.single('image'), (req, res, next) => {

      // cloudinary
  cloudinary.uploader.upload(req.file.path, (result) => {

        let product = {
            item: req.body.item,
            price: req.body.price,
            description: req.body.description,
            width: req.body.width,
            category: req.body.category,
            length: req.body.length,
            height: req.body.height,
            weight: req.body.weight,
            qty: req.body.qty,
            image: {
                id: result.public_id,
                url: result.secure_url
            }
        }
        Product.create(product, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin');
        }
        
    })
})
});

// Here we are giving every product entered into the database a unique ID.
// We are using a GET request to retrieve that specific product for details within the Admin dashboard
// Promises are used for code readability and asyncronous behavior so we may test and receive the correct type of
// Error accordingly
router.get("/productsAdmin/:id", (req, res, next) => {
    Product.findById(req.params.id, function(err, productFound) {
        if(err) {
            console.log(err);
        } else {
            res.render("admin/show", {product: productFound});
        }
    });
});

// Edit route is a GET route and will render a form page prepopulated with data from the product POST creation route.
// The show.ejs document within the views/admin/show.ejs directory retrieves the product with the specified ID Admin wishes to edit and update
router.get("/show/:id", function(req, res) {
    Product.findById(req.params.id, (err, foundProduct) => {
        if(err) {
            console.log(err);
            res.redirect("/admin");
        } else {
            res.render("admin/show", {product: foundProduct});
        }
    })
})

// The Update route is a PUT request updating the previous form data used to create a product, with new information in the case of any adjustments Admin may need to make
// Could not find a way to pass req.body.product.title for example. "Save Changes" form button would not save changes and update the specified ID
router.put("/show/:id", function(req, res) {
    let {item, price, desc, category, length, height, weight, width, qty} = {
        item: req.body.item,
        price: req.body.price,
        desc: req.body.description,
        category: req.body.category,
        length: req.body.length,
        height: req.body.height,
        weight: req.body.weight,
        width: req.body.width,
        qty: req.body.qty
    }

    let newProduct = {item, price, desc, category, length, height, weight, width, qty}

    Product.findByIdAndUpdate(req.params.id, {$set: newProduct}, function(err, productUpdate) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/admin");
        }
    })
})

// Delete route is very simple. This router wil delete the record for the product completely from the database
router.delete("/product/:id/delete", (req, res, next) => {
    Product.findByIdAndRemove(req.params.id, function(err) {
      if(err) {
          console.log(err);
      } else {
          res.redirect("/admin");
      }
    });
});

module.exports = router;

function isAdmin(req, res, next) {
    if (!req.isAuthenticated()){
        res.redirect('/');
    }
    let id = req.session.passport.user;
    User.findById(id, function (err, user){
        if (err) {
            return done(err);
        }
        if (user) {
            if (user.isAdmin) {
                return next();
            }
            res.redirect('/');
        }
    })
}