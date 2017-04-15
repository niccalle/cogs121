import React, { Component } from 'react';
import './RouteSearch.css';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


class RouteImg extends Component{
    render() {
        return <img src={this.props.src} onClick={this.props.handleClick} alt="test"/>
    }
}

class RouteSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [],
            imgs: [],
            start: '',
            end: '',
            index: 0
        }
        //Binding so we can call 'this' inside the methods
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //Load the intial images
        this.getImages();
    }

    render(){
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
                    <ul>
                        {this.state.imgs[this.state.index]}
                    </ul>
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
            var imgs = []

            for (var i in j){
                imgs.push(<RouteImg key={i} src={j[i]} handleClick={() => s.handleClick()}  />);
            }

            s.setState({images: j, imgs: imgs})
        })
    }

    handleClick() {
        console.log(this);
        this.setState({index: (this.state.index + 1)%this.state.images.length});
    }

    getImages(){
        var s = this;
        fetch("/bikeRoute").then(function(response){
            return response.json();
        }).then(function(j){
            var imgs = []

            for (var i in j){
                imgs.push(<RouteImg key={i} src={j[i]} handleClick={() => s.handleClick()}  />);
            }

            s.setState({images: j, imgs: imgs})
        })
    }
}

export default RouteSearch;
