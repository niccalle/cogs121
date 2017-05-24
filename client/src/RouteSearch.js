import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RouteSearch.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// import GoogleMapReact from 'google-map-react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Backend from './backend';
import Search from './Search';
import DirectionsExample from "./DirectionsExample";
import StarRatingComponent from 'react-star-rating-component';
var backend = new Backend();

class RouteImg extends Component{
    render() {
        return <img src={this.props.src} className="route-img" style={this.props.style} onClick={this.props.handleClick} alt="test"/>
    }
}

class MapPlace extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  render() {
    return (
       <div style={this.props.style}>
          {this.props.text}
       </div>
    );
  }
}

class RouteSearch extends Component{
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        greatPlaceCoords: PropTypes.any
    };


    static defaultProps = {
        center: [32.871798,  -117.233799],
        zoom: 12,
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
      };
    constructor(props){
        super(props);
        this.state = {
            coords: [],
            images: [],
            start: '',
            end: '',
            final_start: '',
            final_end: '',
            waypoints: [],
            final_way: [],
            index: 0,
            playing: false,
            speed: 100,
            rating: 0,
            directions: []
        }
        //Binding so we can call 'this' inside the methods
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        //this.playRoute = this.playRoute.bind(this);
        //Load the intial images
    }

    render(){
        const { rating } = this.state;
        var start = []
        var end = []
        var waypoints = []
        var curr = []
        if(this.state.coords.length == 0){
          start = [41.8507300, -87.6512600]
          end = [41.8525800, -87.6514100]
          waypoints = []
        }
        else{
          start = this.state.coords[0];
          end = this.state.coords[this.state.coords.length-3];
          curr = this.state.coords[this.state.index];
          waypoints = this.state.final_way;
        }
        var imgs = []
        for(var i in this.state.images){
            imgs.push(this.renderImage(i));
        }

        var places = [];
        for(var i in this.state.coords){
            places.push(this.renderPlace(i));
        }

        var style = {
            "display": this.state.playing ? "none" : "inline"
        }


        document.body.addEventListener('keydown', this.handleKeyPress);
        var directions = [];
        for (var direction in this.state.directions){
            directions.push(<li dangerouslySetInnerHTML={{__html: this.state.directions[direction]}} ></li>)
        }
        return (
            <div className="container-fluid">
                <Row>
                    <Col md={3}>
                        <Row>
                            <div style={{padding:"7px", width: "100%", height: "340px", margin: "auto"}}>
                                <DirectionsExample start={start} end={end} waypoints={waypoints} curr={this.state.coords} index={this.state.index}/>
                            </div>
                        </Row>
                        <Row>
                            <div className="start-end">
                                <Search handleClick={(st, end) => this.handleSubmit(st, end)}/>
                                <Button bsStyle="success" onClick={()=> this.saveRoute()} block>
                                    Save Route!
                                </Button>
                            </div>
                        </Row>
                        <Row>
                            <div className="starRatings">
                            <StarRatingComponent
                                name="rate"
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                            </div>
                        </Row>

                        <Row>
                                <h3 className="directions-heading"> Directions </h3>
                            <div className="directions">
                                <ul className="directions-list">
                                    {directions}
                                </ul>
                            </div>
                        </Row>
                    </Col>
                    {
                    this.state.final_start != ""
                    && this.state.final_end != ""
                    && (
                    <Col md={9}>

                        <div className="route-gif">
                            <a href="#" className="playWrapper">
                                <span className="playBtn"><img style={style} src="http://wptf.com/wp-content/uploads/2014/05/play-button.png" width="50" height="50" alt=""></img></span>
                            </a>
                            <ul>
                                {imgs}
                            </ul>
                        </div>
                        <Row>
                            <p className="text-center">Use the Arrow Keys to change speed and step frames. Press Space to toggle video</p>
                        </Row>
                    </Col>
                    )}
                </Row>
            </div>
        )
    }

    /*
     * Handles when someone clicks on the stars
     */
    onStarClick(nextValue, prevValue, name) {
        this.setState ({rating: nextValue});
    }

    componentDidMount() {
        var routeId = this.props.match.params.routeid;
        if(routeId != ""){
            window.firebase.database().ref("routes/"+routeId).once("value").then((snapshot)=>{
                var start = snapshot.child("start").val();
                var end = snapshot.child("end").val();
                /*TODO: Add rating and views here later*/
                window.firebase.database().ref('routes/'+routeId).update({
                    views: parseInt(snapshot.child("views").val()) + 1
                })
                var callback = (res, directions) => {
                    this.setState({images: res[0],
                        coords: res[1],
                        final_way: this.state.waypoints,
                        final_start: start,
                        start: start,
                        end: end,
                        final_end: end,
                        directions: directions});
                }
                backend.getRoute(start, end, [], callback);
            })
        }
    }

    handleChange( event ) {
        var name = event.target.id;
        var wayInd = event.target.id.search("way");
        //If it's not a waypoint
        if(name === "start" || name === "end")
            this.setState( {[event.target.id]: event.target.value});
        else {
            var index = parseInt(event.target.id[3]);
            var waypoints = this.state.waypoints;
            waypoints[index] = event.target.value;
            this.setState({waypoints: waypoints});
        }
    }

    /*
    * Makes an API request when submit is clicked
    */
    handleSubmit( start, end ) {

        //Callback to update the UI once our API call has finished.
        var callback = (res, directions) => {
            var routeId = this.getRouteId();
            window.firebase.database().ref("routes/"+routeId).once("value").then((snapshot) => {
                //If this is the first time someone has viewed the route
                if(!snapshot.val()){
                    window.firebase.database().ref('routes/'+routeId).set({
                        start: start,
                        end: end,
                        image: res[0][0],
                        views: 1
                    })
                }
                else{
                    window.firebase.database().ref('routes/'+routeId).update({
                        views: parseInt(snapshot.child("views").val()) + 1
                    })
                }
                this.setState({images: res[0], coords: res[1], final_way: this.state.waypoints, final_start: start, final_end: end, directions: directions});
            })
        }
        backend.getRoute(start, end, this.state.waypoints, callback);
    }

    handleClick() {
        this.playRoute();
    }

    incRoute(){
        this.setState({index: (this.state.index + 1)%this.state.images.length});
    }

    renderImage(i) {
        var style = {
            "display": i == this.state.index ? "inline" : "none"
        }
        return <RouteImg key={i} src={this.state.images[i]} style={style} handleClick={() => this.handleClick()}/>;
    }

    renderPlace(i) {
        var currlat = 0;
        var currlong = 0;

        var style = {
            "display": i == this.state.index ? "inline" : "none"
        }

        if(this.state.coords[i]){
          currlat = this.state.coords[i][0];
          currlong = this.state.coords[i][1];
        }
        return <MapPlace lat={currlat} lng={currlong} style={style} text={'YOU ARE HERE'} /* Kreyser Avrora */ />
    }

    getImages(){
        var res = backend.bikeRoute();
        this.setState({images: res[0], coords: res[1]});
    }

    playRoute(){
        if(!this.state.playing){
            this.interval = setInterval(() => this.incRoute(), this.state.speed);
            this.setState({playing: true});
        }
        else{
            clearInterval(this.interval);
            this.setState({playing: false});
        }
    }

    updateSpeed(delta){
        if(!this.state.playing){
            this.setState({speed: Math.max(10, this.state.speed + delta)});
        }
        else{
            clearInterval(this.interval);
            this.interval = setInterval(() => this.incRoute(), Math.max(10, this.state.speed + delta));
            this.setState({speed: Math.max(10, this.state.speed + delta)});
        }
    }

    handleKeyPress = (event) => {
        if(document.activeElement.tagName === "INPUT") return;
        switch(event.key){
            case " ":
                event.preventDefault();
                return this.playRoute();
            case "ArrowLeft":
                event.preventDefault();
                this.setState({index: Math.max(this.state.index-1, 0)})
                return;
            case "ArrowRight":
                event.preventDefault();
                this.setState({index: (this.state.index + 1)%this.state.images.length});
                return;
            case "ArrowUp":
                event.preventDefault();
                this.updateSpeed(-10);
                return;
            case "ArrowDown":
                event.preventDefault();
                this.updateSpeed(10);
                return;

            default:
                return;
        }
    }

    /*Probably gonna have to find a better way to store the routes in the database
      as of right now, its just gonna be a string thats
      "start-waypoints-end"*/
    getRouteId(){
        var returnString = this.state.start;
        for(var i in this.state.waypoints){
            returnString += "-"+this.state.waypoints[i];
        }
        returnString += "-"+this.state.end;

        return returnString;
    }

    saveRoute(){
        var uid = window.firebase.auth().currentUser.uid;
        var routeid = this.getRouteId();
        window.firebase.database().ref("users/"+uid+"/routes/"+routeid+"/").update({saved: true});
    }
}

export default RouteSearch;
