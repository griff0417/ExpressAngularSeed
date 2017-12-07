var LocalStrategy   = require('passport-local').Strategy;
var User            = require('./models/user.js');

// Expose this function to our app using module.exports
module.exports = function(passport) {

    //==========================================================================
    //  Passport session setup
    //==========================================================================
    // Required for persistent login sessions.
    // Passport needs ability to serialize and unserialize users out of session

    // Used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //==========================================================================
    //  Local Signup
    //==========================================================================
    // We are using named strategies since we have one for login and one for signup.
    // By default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // By default, local strategy uses username and password, we want to use email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // Allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // User.findOne won't fire unless data is sent back
        process.nextTick(function() {

            // Find a user whose email is the same as the forms email
            // We're checking to see if the user trying to login already exists
            User.findOne({'local.email' :  email}, function(err, user) {
                // If there are any errors, return the error
                if (err)
                    return done(err);

                // Check to see if there's already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'An account with that email has already been created.'));
                }
                else {
                    // If there is no user with that email, create the user
                    var newUser = new User();

                    // Set the user's local credentials
                    newUser.firstName           = req.body.firstName;
                    newUser.lastName            = req.body.lastName;
                    newUser.local.email         = email;
                    newUser.local.password      = newUser.generateHash(password);

                    // Save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    //==========================================================================
    //  Local Login
    //==========================================================================
    // We are using named strategies since we have one for login and one for signup.
    // By default, if there was no name, it would just be called 'local'.

    passport.use('local-login', new LocalStrategy({
        // By default, local strategy uses username and password, we want to use email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // Allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // Callback with email and password from our form
        // Find a user whose email is the same as the forms email
        // We are checking to see if the user trying to login already exists.
        User.findOne({'local.email' :  email}, function(err, user) {
            // If there are any errors, return the error before anything else
            if (err)
                return done(err);

            // If no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Login Failed. Invalid Email or Password.'));

            // If the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Login Failed. Invalid Email or Password.')); // create the loginMessage and save it to session as flashdata

            // All is well, return successful user
            return done(null, user);
        });
    }));
};
