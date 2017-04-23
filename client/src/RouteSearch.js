import React, { Component } from 'react';
import './RouteSearch.css';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
class RouteImg extends Component{
    render() {
        return <img src={this.props.src} style={this.props.style} onClick={this.props.handleClick} alt="test"/>
    }
}

class RouteSearch extends Component{
    static defaultProps = {
        center: {lat: 59.95, lng: 30.33},
        zoom: 11
      };
    constructor(props){
        super(props);
        this.state = {
            images: [],
            start: '',
            end: '',
            index: 0,
            playing: false,
            speed: 100
        }
        //Binding so we can call 'this' inside the methods
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.playRoute = this.playRoute.bind(this);
        //Load the intial images
        this.getImages();
    }

    render(){
        var imgs = []
        for(var i in this.state.images){
            imgs.push(this.renderImage(i));
        }
        var style = {
            "display": this.state.playing ? "none" : "inline"
        }
        document.body.addEventListener('keydown', this.handleKeyPress);
        return (
            <div className="container">
                <div className="start-end">
                    <Form>
                        <Row>
                            <FormGroup>
                                <Col md={5}>
                                    <FormControl type="text" placeholder="Start" id="start" onChange={this.handleChange}/>
                                </Col>
                                <Col md={5}>
                                    <FormControl type="text" placeholder="End" id="end" onChange={this.handleChange}/>
                                </Col>
                                <Col md={2}>
                                    <Button bsStyle="success" onClick={this.handleSubmit} block>
                                        Preview Route!
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Row>
                    </Form>
                </div>
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
                <div style={{width: "50%", height: "200px", margin: "auto"}}>
                    <GoogleMapReact
                      defaultCenter={this.props.center}
                      defaultZoom={this.props.zoom}
                      />
                </div>
            </div>
        )
    }

    /*
    * Updates the state values whenever any keyboard input is pressed
    */
    handleChange( event ) {
        this.setState( {[event.target.id]: event.target.value});
    }

    /*
    * Makes an API request when submit is clicked
    */
    handleSubmit( event ) {
        console.log(this);
        event.preventDefault();
        var s = this;
        fetch("/getRoute?origin="+this.state.start+"&destination="+this.state.end).then(function(response){
            return response.json();
        }).then(function(j){
            var imgs = [];
            // s.setState({images: j});
            s.setState({images: j, index: 0, playing: false})
        })
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

    getImages(){
        var s = this;
        fetch("/bikeRoute").then(function(response){
            return response.json();
        }).then(function(j){
            var imgs = []
            s.setState({images: j})
        })
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
}

export default RouteSearch;
