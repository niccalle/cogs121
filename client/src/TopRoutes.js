import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TopRoutes.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import Backend from "./backend.js";
var backend = new Backend();

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class TopRoutes extends Component{
    state = {
        routes: [],
        showModal: false,
        start: "",
        end: ""
    }
    componentDidMount(){
        var routes = []
        window.firebase.database().ref("routes/").once("value").then((snapshot) => {
            snapshot.forEach(function(childSnapshot){
                var start = childSnapshot.child("start").val();
                var end = childSnapshot.child("end").val();
                var views = childSnapshot.child("views").val();
                var image = childSnapshot.child("image").val();
                routes.push({routeId: childSnapshot.key, start: start, image: image, end: end, views: views});
            });
            this.setState({routes: routes});
        })
    }
    render() {
        console.log(this.state.routes);
        var cards = [];
        for(var i in this.state.routes){
            cards.push(this.createRouteCard(this.state.routes[i]));
        }
        return(
            <div>
                <div className="container-flex row gutter-0">
                    <Col lg={3} Col md={4} Col sm={6}>
                        <div className="card">
                            <img className="card-img-top" onClick={() => this.createCustomRoute()} src="http://www.clipartbest.com/cliparts/4i9/aGX/4i9aGXrET.png" alt="Card image cap"/>
                            <div className="card-block">
                                <h4 className="card-title">CREATE YOUR OWN</h4>
                                <p className="card-text">custom route</p>
                            </div>
                        </div>
                    </Col>
                    {cards}
                </div>


                <Modal
                    isOpen={this.state.showModal}
                    onAfterOpen={() => this.afterOpenModal()}
                    onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <div className="container">
                        <h2 ref="subtitle">Create A Route</h2>
                        <button onClick={() => this.closeModal()}>close</button>
                        <Row>
                            <Col md={4}>
                                <FormControl type="text"
                                    className="search-box-input"
                                    placeholder="Start"
                                    id="start"
                                    onChange={(e) => this.handleChange(e)}
                                    />
                            </Col>
                            <Col md={4}>
                                <FormControl type="text" className="search-box-input" placeholder="End" id="end" onChange={(e) => this.handleChange(e)}/>
                            </Col>
                            <Col md={4}>
                                <button onClick={() => this.goToCustomRoute()}>Go to Route!</button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }

    handleChange( event ) {
        var name = event.target.id;
        var wayInd = event.target.id.search("way");
        //If it's not a waypoint
        if(name === "start" || name === "end")
            this.setState( {[event.target.id]: event.target.value});
    }

    goToCustomRoute(){
        var callback = (res, directions) => {
            var routeId = this.state.start + "-" + this.state.end;
            window.firebase.database().ref("routes/"+routeId).once("value").then((snapshot) => {
                //If this is the first time someone has viewed the route
                if(!snapshot.val()){
                    window.firebase.database().ref('routes/'+routeId).set({
                        start: this.state.start,
                        end: this.state.end,
                        image: res[0][0],
                        views: 1
                    })
                }
                else{
                    window.firebase.database().ref('routes/'+routeId).update({
                        views: parseInt(snapshot.child("views").val()) + 1
                    })
                }
                this.setState({showModal: false})
            })
        }
        backend.getRoute(this.state.start, this.state.end, [], callback);
    }

    createRouteCard(route){
        return (
            <Col lg={3} Col md={4} Col sm={6}>
                <div className="card">
                    <img className="card-img-top" src={route.image} alt="Card image cap"/>
                    <div className="card-block">
                        <h4 className="card-title"><Link to={'/route/'+route.routeId}> {route.start} to {route.end} </Link></h4>
                        <p className="card-text">Views: {route.views}</p>
                    </div>
                </div>
            </Col>
        )
    }

    createCustomRoute(){
        this.setState({showModal: true})
    }

    afterOpenModal() {
        // this.refs.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({showModal: false});
    }
}
export default TopRoutes;
