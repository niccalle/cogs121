var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var GoogleMapsAPI = require('googlemaps');
var port = process.env.port || 3001;



var APIKEY = "AIzaSyCuJpY-A-LadO95r90DWf0_HMALJTO2KYg";
var publicConfig = {key: APIKEY}
var gmAPI = new GoogleMapsAPI(publicConfig);

var baseurl = "https://maps.googleapis.com/maps/api/streetview?"
app.use(express.static(path.join(__dirname, '/static')));

app.use(bodyParser.urlencoded({extended: true}));

// app.set('view engine', 'ejs');
//
// app.get('/', function(req, res){
//     res.render('index');
// });

app.get('/bikeRoute', function(req,res){
    //Test locations along torrey pines rd
    var locations = [
        "32.9302117,-117.2598747",
        "32.9305074,-117.2599049",
        "32.9306982,-117.2599242",
        "32.9307913,-117.2599337",
        "32.9309801,-117.2599538",
        "32.9310748,-117.2599642",
        "32.9312666,-117.2599888",
        "32.9314699,-117.2600164",
        "32.9318718,-117.2600714",
        "32.9323088,-117.2601319",
        "32.9326816,-117.2601851",
        "32.9328687,-117.2602141",
        "32.9330552,-117.2602482",
        "32.9336309,-117.2602437"
    ]
    var images = Array(locations.length);
    for(var i = 0; i < locations.length; i++){
        params = {
            location: locations[i],
            size: "600x300",
            heading: 0,
            fov: "120",
        }
        images[i] = gmAPI.streetView(params)
    }
    res.send(images);

})

app.listen(port, function(){
    console.log("listening in on port " + port);
});
