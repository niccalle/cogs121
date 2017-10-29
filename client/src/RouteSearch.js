import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RouteSearch.css';
import '../assets/font-awesome-4.7.0/css/font-awesome.css'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// import GoogleMapReact from 'google-map-react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Backend from './backend';
import Search from './Search';
import DirectionsExample from "./DirectionsExample";
import VideoControlRow from './VideoControlRow';
var backend = new Backend();
var FontAwesome = require('react-fontawesome');

class RouteImg extends Component{
  render() {
    return (
      <img
        src={this.props.src}
        className="route-img"
        style={this.props.style}
        onClick={this.props.handleClick}
        alt="test"
      />
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
      directions: [],
      videoStatus: " fa-play",
    }
  }

  render(){
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
            <h2>{this.state.start.split(",")[0]} to {this.state.end.split(",")[0]}</h2>
            <Row>
              <div style={{padding:"7px", width: "100%", height: "300px", margin: "auto"}}>
                <DirectionsExample start={start} end={end} waypoints={waypoints} curr={this.state.coords} index={this.state.index}/>
              </div>
            </Row>
          </Col>
          {
            this.state.final_start != "" &&
            this.state.final_end != "" &&
            (
              <Col md={9}>
                <div className="route-gif">
                  <a href="#" className="playWrapper">
                    <span className="playBtn">
                      <img
                        style={style}
                        src="http://wptf.com/wp-content/uploads/2014/05/play-button.png"
                        width="50"
                        height="50"
                        alt=""
                      />
                    </span>
                  </a>
                  <ul>
                    {imgs}
                  </ul>
                </div>
                <VideoControlRow
                  videoStatus={this.state.videoStatus}
                  playRoute={() => this.playRoute()}
                  changeVideo={(e) => this.changeVideo(e)}
                  resetRoute={() => this.resetRoute()}
                />
              </Col>
            )
          }
        </Row>
      </div>
    );
  }

  componentDidMount() {
    var routeId = this.props.match.params.routeid;
    if (routeId != "") {
      window.firebase.database().ref("routes/"+routeId).once("value").then(
        (snapshot)=>{
          var start = snapshot.child("start").val();
          var end = snapshot.child("end").val();
          /*TODO: Add rating and views here later*/
          window.firebase.database().ref('routes/'+routeId).update({
            views: parseInt(snapshot.child("views").val()) + 1
          })
          var callback = (res, directions) => {
            this.setState(
              {
                images: res[0],
                coords: res[1],
                final_way: this.state.waypoints,
                final_start: start,
                start: start,
                end: end,
                final_end: end,
                directions: directions,
              }
            );
          }
          backend.getRoute(start, end, [], callback);
        }
      );
    }
  }

  incRoute() {
    if(this.state.index + 1 == this.state.images.length) {
      this.playRoute();
      this.setState({ index: 0 });
    } else {
      this.setState({index: (this.state.index + 1)%this.state.images.length});
    }
  }

  renderImage(i) {
    var style = {
      "display": i == this.state.index ? "inline" : "none"
    }
    return (
      <RouteImg
        key={i}
        src={this.state.images[i]}
        style={style}
        handleClick={() => this.playRoute()}
      />
    );
  }

  playRoute() {
    if(!this.state.playing){
      this.interval = setInterval(() => this.incRoute(), this.state.speed);
      this.setState({playing: true});
      this.setState({videoStatus: " fa-stop"})
    } else {
      clearInterval(this.interval);
      this.setState({playing: false});
      this.setState({videoStatus: " fa-play"})
    }
  }

  updateSpeed(delta) {
    if(!this.state.playing){
      this.setState({ speed: Math.max(10, this.state.speed + delta) });
    } else {
      clearInterval(this.interval);
      this.interval = setInterval(
        () => this.incRoute(),
        Math.max(10, this.state.speed + delta)
      );
      this.setState({ speed: Math.max(10, this.state.speed + delta) });
    }
  }

  handleKeyPress = (event) => {
    if(document.activeElement.tagName === "INPUT") return;
    this.changeVideo(event.key)
  }

  changeVideo(option){
    switch(option){
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
        this.setState({currentRate: this.state.currentRate + .1})
        return;
      case "ArrowDown":
        event.preventDefault();
        this.updateSpeed(10);
        this.setState({currentRate: this.state.currentRate + .1})
        return;
      default:
        return;
    }
  }

  resetRoute() {
    clearInterval(this.interval);
    this.setState({playing: false});
    this.setState({index: 0})
    this.setState({videoStatus: " fa-play"});
  }
}

      export default RouteSearch;
