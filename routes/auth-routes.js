var User        = require('../models/user.js');

module.exports = function(app, passport) {

    //==========================================================================
    //  Login | POST
    //==========================================================================
    app.post('/api/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err); // Will generate a 500 error
            }

            // Generate a JSON response reflecting authentication status
            if (!user) {
                return res.send({ success: false, message: req.flash('loginMessage') });
            }

            // Success
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }

                var resUser = {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.local.email,
                    "_id": user._id
                };

                return res.send({ success: true, message: 'ok', user: resUser });
            });
        })(req, res, next);
    });

    //==========================================================================
    //  Signup | POST
    //==========================================================================
    app.post('/api/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return next(err); // Will generate a 500 error
            }

            // Generate a JSON response reflecting authentication status
            if (!user) {
                return res.send({ success: false, message: req.flash('signupMessage') });
            }

            // Success
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }

                var resUser = {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.local.email,
                    "_id": user._id
                };

                return res.send({ success: true, message: 'ok', user: resUser });
            });
        })(req, res, next);
    });

    //==========================================================================
    //  Logout | GET
    //==========================================================================
    app.get('/logout', function(req, res, next) {
        if (isLoggedIn(req, res, next)) {
            req.logout();
            var message = encodeURIComponent('Logged out successfully!');
            res.redirect('/?message=' + message);
        }
        else {
            var message = encodeURIComponent("You weren't logged in!");
            res.redirect('/?message=' + message);
        }
    });
};

// Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // If user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return true;

    // If they aren't redirect them to the home page
    res.redirect('/');
}
