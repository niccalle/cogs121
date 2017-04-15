var GoogleMapsAPI = require('googlemaps');
var APIKEY = "AIzaSyCuJpY-A-LadO95r90DWf0_HMALJTO2KYg";
var publicConfig = {key: APIKEY}
var gmAPI = new GoogleMapsAPI(publicConfig);
var request = require('request');
var polyline = require('@mapbox/polyline');


module.exports.bikeRoute = function(req, res){
    var locations = polyline.decode("mj`hEhqujUc@A{@AwAG]?sAEg@A{@?WE_BAk@Cm@Eq@EiAQeB_@sA]uA_@oA[o@Ms@K}@EiAAy@B[Bi@F_ANk@NwBl@oA\[JwA^gD~@c@LgCr@SFw@RcFxAy@R[JeBb@eBf@kBh@uA`@yBj@qAZ_AT_AXoErA_D|@s@PqEpA");
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
    res.send(images);
}
