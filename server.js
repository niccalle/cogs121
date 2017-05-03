var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.port || 3001;
var mapsRoute = require('./routes/mapsroute');
var mysql       = require('mysql');

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

app.get('/bikeRoute', mapsRoute.bikeRoute);

app.get('/getRoute', mapsRoute.getRoute);

app.listen(port, function(){
    console.log("listening in on port " + port);
});
