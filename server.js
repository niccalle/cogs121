var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.port || 3001;
var mapsRoute = require('./routes/mapsroute');


app.use(express.static(path.join(__dirname, '/static')));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/bikeRoute', mapsRoute.bikeRoute);

app.get('/getRoute', mapsRoute.getRoute);

app.listen(port, function(){
    console.log("listening in on port " + port);
});
