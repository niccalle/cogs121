var GoogleMapsAPI = require('googlemaps');
var sv_APIKEY = "AIzaSyCuJpY-A-LadO95r90DWf0_HMALJTO2KYg";
var dir_APIKEY = "AIzaSyD0dpZoUc_MBJ86CEq4me3KLKWZUmiJ6dY"
var publicConfig = {key: sv_APIKEY}
var gmAPI = new GoogleMapsAPI(publicConfig);
var request = require('request');
var polyline = require('@mapbox/polyline');
var dir_url = "https://maps.googleapis.com/maps/api/directions/json?key="+dir_APIKEY;

function getImages(poly){
    var locations = polyline.decode(poly);
    var images = Array(locations.length);
    for(var i = 0; i < locations.length; i++){
        params = {
            location: ""+locations[i][0]+","+locations[i][1],
            size: "600x300",
            heading: 0,
            fov: "120",
        }
        images[i] = gmAPI.streetView(params)
    }
    return images;
}
module.exports.bikeRoute = function(req, res){
    res.send(getImages("mj`hEhqujUc@A{@AwAG]?sAEg@A{@?WE_BAk@Cm@Eq@EiAQeB_@sA]uA_@oA[o@Ms@K}@EiAAy@B[Bi@F_ANk@NwBl@oA\[JwA^gD~@c@LgCr@SFw@RcFxAy@R[JeBb@eBf@kBh@uA`@yBj@qAZ_AT_AXoErA_D|@s@PqEpA"));
}

module.exports.getRoute = function(req, res){
    console.log("getRoute");
    var origin = req.query.origin;
    var destination = req.query.destination;
    request.get(dir_url + "&mode=bicycle&origin=" + origin + "&destination=" + destination, function(err, r, body){
        console.log("requested");
        if(err) {
            console.log(err);
            return err;
        }
        body = JSON.parse(body);
        var poly = body.routes[0].overview_polyline.points
        res.send(getImages(poly));
    })

}
