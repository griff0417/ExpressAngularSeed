
/**
 * Module dependencies
 */
var express         = require('express'),
  bodyParser        = require('body-parser'),
  methodOverride    = require('method-override'),
  errorHandler      = require('express-error-handler'),
  morgan            = require('morgan'),
  http              = require('http'),
  path              = require('path'),
  fs                = require('fs'),
  passport          = require('passport'),
  flash             = require('connect-flash'),
  cookieParser      = require('cookie-parser'),
  session           = require('express-session'),
  mongoose          = require('mongoose');

// DB Config
var dbConfig = JSON.parse(fs.readFileSync('./DBConfig.json', 'utf8'));

if (dbConfig && dbConfig.use_database == true) {
  require('./passport')(passport);
}

var app = module.exports = express();

// Mongo DB setup
var MongoClient = require('mongodb').MongoClient;
mongoose.connect(dbConfig.database_url);

/**
 * Configuration
 */
// All environments
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(path.join(__dirname, 'public')));

// Required for passport
app.use(session({ secret: 'somerandomkeytypeanythingyouwanthere' })); // Session secret
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions
app.use(flash()); // Use connect-flash for flash messages stored in session

var env = process.env.NODE_ENV || 'development';

// Development only
if (env === 'development') {
  app.use(errorHandler());
}

// Production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// Database route connection
app.use(function(req, res, next) {
    if (dbConfig && dbConfig.use_database == true) {
        MongoClient.connect(dbConfig.database_url, function (err, db) {
            if(err) throw err;

            req.useDb = true;
            req.db = db;
            next();
        });
    }
    else {
        req.useDb = false;
        next();
    }
});

// API routes
if (dbConfig && dbConfig.use_database == true) {
    app.use('/api/generic', require('./routes/restapi-routes'));
    require('./routes/auth-routes')(app, passport);
    // more api routes here ...
}

// Resource file routes
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/templates', express.static(__dirname + '/templates'));
app.use('/lib', express.static(__dirname + '/lib'));

/*
    The root url for authentication.
    Routes to the login angular app that handles
    authentication. This is ungated. Successful login
    will redirect to /* which will return the main
    angular app.
*/
app.get('/', function(req, res, next) {
    if (isLoggedIn(req, res, next)) {
        res.redirect('/home');
    }
    else {
        res.sendFile('login.html', { root: __dirname, message: req.query.message });
    }
});

/*
    A catch all for any other undefined route. This
    returns the main angular app. This is gated.
*/
app.all('/*', function(req, res, next) {
    if (isLoggedIn(req, res, next)) {
        // Just send the index.html for other files to support HTML5Mode
        res.sendFile('index.html', { root: __dirname });
    }
    else {
        var message = encodeURIComponent('You must log in to do that.');
        res.redirect('/?message=' + message);
    }
});

// Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    if (!dbConfig || (dbConfig && dbConfig.use_database == false)) {
        return true;
    }

    // If user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return true;

    // If they aren't return false
    return false;
}


/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
