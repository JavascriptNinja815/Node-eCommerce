'use strict';

// Require node packages through NPM
let express = require('express');
let bodyParser = require('body-parser'); // Parse URL requests in JSON format
let morgan = require('morgan'); // Installed with NPM && a package to log changes and keep track of changes
let methodOverride = require('method-override');
let mongoose = require('mongoose');
let path = require('path');
let session = require('express-session');
let passport = require('passport');
let flash = require('connect-flash');
let validator = require('express-validator');
// Make sure to require mongo store after the session
let MongoStore = require('connect-mongo')(session);

// REQUIRE ROUTES
let messageRoute = require('./routes/messages');
let clientRoute = require('./routes/clients');
let productRoute = require('./routes/products');
let indexRoute = require('./routes/index');
let braintreeRoute = require('./routes/braintree');
// let shippingRoute = require('./routes/shipping');
let orderRoute = require('./routes/orders');
let userRoute = require('./routes/users');

let app = express();

// Mongo Atlas connection details below
/*===================================================================================
mongoose.connect(
    "mongodb+srv://jclewis1989:Yhxdcm71@tidepool-aquatics-oe4gx.mongodb.net/test?retryWrites=true"
).catch(function(err) {
    console.log(err);
})
*/

mongoose.connect(process.env.MONGOLAB_GREEN_URI || "mongodb://localhost/shopping");
// mongoose.connect(process.env.MONGOLAB_GREEN_URI || "mongodb://localhost:27017/shopping");


/*=========================================================*/
/* CONNNECTING WITH MONGO LAB for Heroku purposes
/*=========================================================*/
/*
var mongodbUri ='mongodb://jclewis1989:Yhxdcm71@ds012345.mlab.com:56789/TidePools';
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  auth: {
    user: 'UserName',
    password: 'Password'
  }
})
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));   
conn.once('open', () =>{
 console.log('Connected to your Database!')                       
});
*/

// Require config passport package!
require('./config/passport');

// EJS
app.set("view engine", "ejs");

// BODY PARSER
// Must come prior to all routes so data is parsed prior to POST requests in routes for form data submission
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json()); // This makes JSON data easily readable for us
// Validator - Right after body parser!
app.use(validator());
// Sessions from express-session NPM
app.use(session({
    secret: 'erestu',
    resave: false, // Default is true
    saveUninitialized: false, // Default is true
    // Both defaults are deprecated!
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
}));
// Initialize flash
app.use(flash());
// Passport
app.use(passport.initialize());
app.use(passport.session());
// HTML || PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'uploads')));
// Setting gobal...
app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    // Session
    res.locals.session = req.session;
    next();
})

// Morgan to log to 'dev'
app.use(morgan('dev'));

// uncomment after placing your favicon in /html
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Add headers to the res object to avoid CORS Errors within your API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

// METHOD OVERRIDE
app.use(methodOverride('_method'));

// USE ROUTES
app.use(messageRoute);
app.use(clientRoute);
app.use(productRoute);
app.use(indexRoute);
app.use(braintreeRoute);
// app.use(shippingRoute);
app.use(orderRoute);
app.use(userRoute);


// Custom 404 handler to catch errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404; // Not Found = 404 code
    next(error); // Forward the err request listed above
})

// Customer error handler to catch any other errors than a '404'
app.use((error, req, res, next) => {
    res.status(error.status || 500); // 500 Code for all other types of errors
    res.json({
        error: {
            message: error.message
        }
    })
});

// LISTEN TO SERVER
app.listen(process.env.PORT || 8080, function() {
    console.log("Server has started");
})