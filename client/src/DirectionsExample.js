import {
  default as React,
  Component,
} from "react";


import {withGoogleMap,
  GoogleMap,
  DirectionsRenderer, } from "react-google-maps";

const DirectionsExampleGoogleMap = withGoogleMap(props => (
<GoogleMap
  defaultZoom={7}
  defaultCenter={props.center}
>
  {props.directions && <DirectionsRenderer directions={props.directions} />}
</GoogleMap>
));


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

  // constructor(){
  //   super(props);
  //   if(this.props.start == ""){
  //     this.state = {
  //       state = {
  //         origin: new window.google.maps.LatLng(41.8507300, -87.6512600),
  //         destination: new window.google.maps.LatLng(41.8525800, -87.6514100),
  //         directions: null,
  //       }
  //     }
  //   }
  //   else{
  //     this.state = {
  //       origin: new window.google.maps.LatLng(parseInt(this.props.start[0]), parseInt(this.props.start[1])),
  //       destination: new window.google.maps.LatLng(parseInt(this.props.end[0]), parseInt(this.props.end[1])),
  //       directions: null,
  //     }
  //   }
  //
  // }
  componentDidMount() {
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  componentDidUpdate(){
    const DirectionsService = new window.google.maps.DirectionsService();
    console.log("origin" + this.state.origin);
    console.log("dest" + this.state.destination);
    var origin = new window.google.maps.LatLng(this.props.start[0], this.props.start[1]);
    var destination = new window.google.maps.LatLng(this.props.end[0], this.props.end[1]);

    var wp = []; 
    for( var i in this.props.waypoints){
      console.log(i, this.props.waypoints[i]);
      wp.push({
        location: this.props.waypoints[i],
        stopover: true
      })
    }
    

    DirectionsService.route({
      origin: origin,
      destination: destination,
      waypoints: wp,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  render() {
    return (
      <DirectionsExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.origin}
        directions={this.state.directions}
      />
    );
  }
}
