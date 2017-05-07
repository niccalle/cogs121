var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.port || 3001;
var mapsRoute = require('./routes/mapsroute');
var mysql       = require('mysql');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var cors = require('cors');
var session = require('express-session');
passport.use(new FacebookStrategy({
    clientID: "468472356817481",
    clientSecret: "591aa5330a5c74d49b3e9316e8db5b40",
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile);
    cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 8889,
    user     : 'root',
    password : 'root',
    database : 'database_website'
});

connection.connect();

app.use(express.static(path.join(__dirname, '/client/public')));

app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/bikeRoute', mapsRoute.bikeRoute);

app.get('/getRoute', mapsRoute.getRoute);

app.get('/auth/facebook', passport.authenticate('facebook', { display: 'popup' }));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/' })
);
app.get("/failed", function(req,res){res.send("failed")});

app.listen(port, function(){
    console.log("listening in on port " + port);
});
