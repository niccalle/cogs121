import {
    default as React,
    Component,
} from "react";


import {withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker} from "react-google-maps";

    const DirectionsExampleGoogleMap = withGoogleMap(props => {
        return (
            <GoogleMap
                defaultZoom={7}
                defaultCenter={props.center}
                bootstrapURLKeys={{key: "AIzaSyBI5nHZDXjttXU7IwqKYbzr8XzLLFAquC0"}}
                >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
                {props.markers.map((marker, index) => {
                    if(index == props.index)
                        return (<Marker defaultPosition={marker} key={index}/>)
                })}
            </GoogleMap>
        )
    });


    export default class DirectionsExample extends Component {

        state = {
            origin: new window.google.maps.LatLng(41.8507300, -87.6512600),
            destination: new window.google.maps.LatLng(41.8525800, -87.6514100),
            directions: null,
            waypoints: null,
        }
        state = {
            origin: new window.google.maps.LatLng(this.props.start[0], this.props.start[1]),
            destination: new window.google.maps.LatLng(this.props.end[0], this.props.end[1]),
            directions: null,
            waypoints: this.props.waypoints,

        }

        componentDidMount() {
            const DirectionsService = new window.google.maps.DirectionsService();
            DirectionsService.route({
                origin: this.state.origin,
                destination: this.state.destination,
                travelMode: window.google.maps.TravelMode.BICYCLING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                }
            });
        }

        componentDidUpdate(){
            const DirectionsService = new window.google.maps.DirectionsService();
            var origin = new window.google.maps.LatLng(this.props.start[0], this.props.start[1]);
            var destination = new window.google.maps.LatLng(this.props.end[0], this.props.end[1]);

            var wp = [];
            for( var i in this.props.waypoints){
                //console.log(i, this.props.waypoints[i]);
                wp.push({
                    location: this.props.waypoints[i],
                    stopover: true
                })
            }


            DirectionsService.route({
                origin: origin,
                destination: destination,
                waypoints: wp,
                travelMode: window.google.maps.TravelMode.BICYCLING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } 
            });
        }

        render() {
            var markerLocation;
            if(this.props.curr.length > 0){
                markerLocation = this.props.curr.map((marker, ind) => (new window.google.maps.LatLng(marker[0], marker[1])));
            }

            return (
                <DirectionsExampleGoogleMap
                    containerElement={
                        <div style={{ height: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    center={this.state.origin}
                    markers={markerLocation}
                    index={this.props.index}
                    directions={this.state.directions}
                    />
            );
        }
    }
