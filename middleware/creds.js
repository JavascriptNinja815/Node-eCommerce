'use strict';

const middlewareObj = {};

middlewareObj.isAdmin = function(req, res, next) {
    if (req.isAuthenticated()) { 
        return next();
    }
    req.flash("error", "You need to be logged in first"); // add a one-time message before redirect
    res.redirect("/");
}
