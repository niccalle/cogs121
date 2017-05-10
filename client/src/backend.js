var GoogleMapsAPI = require('googlemaps');
var sv_APIKEY = "AIzaSyCuJpY-A-LadO95r90DWf0_HMALJTO2KYg";
//var dir_APIKEY = "AIzaSyD0dpZoUc_MBJ86CEq4me3KLKWZUmiJ6dY"
var publicConfig = {key: sv_APIKEY}
var gmAPI = new GoogleMapsAPI(publicConfig);
var polyline = require('@mapbox/polyline');

class Backend {
    getImages(poly){
        var locations = polyline.decode(poly);
        var coords = Array(locations.length);
        var images = Array(locations.length);
        for(var i = 0; i < locations.length-1; i++){
            var x1 = locations[i][0];
            var y1 = locations[i][1];
            var x2 = locations[i+1][0];
            var y2 = locations[i+1][1];
            var params = {

                location: ""+x1+","+y1,
                size: "600x300",
                heading: this.getDirection(x1,y1,x2,y2),
                fov: "120",
            }
            coords[i] = [x1, y1]
            images[i] = gmAPI.streetView(params)
        }

        return [images, coords];
    }

    getDirection(x1,y1,x2,y2){
        var x3 = x2 - x1;
        var y3 = y2 - y1;
        var rad = Math.atan2(y3,x3);
        var deg = rad * (180/Math.PI);

        if(deg < 0){
            return 360 + deg;
        }
        return deg;

    }

    bikeRoute = function(){
        return this.getImages("mj`hEhqujUc@A{@AwAG]?sAEg@A{@?WE_BAk@Cm@Eq@EiAQeB_@sA]uA_@oA[o@Ms@K}@EiAAy@B[Bi@F_ANk@NwBl@oA\[JwA^gD~@c@LgCr@SFw@RcFxAy@R[JeBb@eBf@kBh@uA`@yBj@qAZ_AT_AXoErA_D|@s@PqEpA");
    }

    getRoute = function(origin, destination, waypoints, cb){
        console.log(window.google);
        
        const DirectionsService = new window.google.maps.DirectionsService();

        //Creates waypoint JSON
        var wp = []; 
        for( var i in waypoints){
            wp.push({
                location: waypoints[i],
                stopover: true
            })
        }

        DirectionsService.route({
            origin: origin,
            destination: destination,
            waypoints: wp,
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (body, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                cb(this.getImages(body.routes[0].overview_polyline));
            } else {
                console.error(`error fetching directions ${body}`);
            }
        });
        // request.get(dir_url + "&mode=bicycle&origin=" + origin + "&destination=" + destination, function(err, r, body){
        //     if(err) {
        //         return err;
        //     }
        //     body = JSON.parse(body);
        //     var poly = body.routes[0].overview_polyline.points
        //     cb(this.getImages(poly));
        //     //res.send(getImages(poly));
        // })

    }

}

export default Backend;
