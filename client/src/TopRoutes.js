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
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import DirectionsExample from "./DirectionsExample";
import Search from './Search';
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
        coords: [],
        waypoints: [],
        showModal: false,
        start: '',
        end: ''
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

        var start = []
        var end = []
        var waypoints = []

        if(this.state.coords.length == 0){
          start = [41.8507300, -87.6512600]
          end = [41.8525800, -87.6514100]
          waypoints = []
        }
        else {
          start = this.state.coords[0];
          end = this.state.coords[this.state.coords.length-3];
          waypoints = this.state.waypoints;
        }


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
                            <div className="card-block">
                                <div className="create-plus">
                                    <span className="glyphicon glyphicon-plus" onClick={() => this.createCustomRoute()} ></span>
                                </div>
                                <h4 className="card-title">Create your Own</h4>
                                <h4 className="card-title">Custom Route</h4>
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
                        <Row>
                          <h2 ref="subtitle">Create A Route
                            <button
                              style={{padding:"7px", float:"right"}}
                              onClick={() => this.closeModal()}>
                                x
                              </button>
                          </h2>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div style={{padding:"7px", width: "100%", height: "300px", margin: "auto"}}>
                                    <DirectionsExample start={start} end={end} waypoints={[]} curr={start} index={0}/>
                                </div>
                            </Col>

                            <Col md={6}>
                              <Search handleClick={(st, end) => this.handleSubmit(st, end)}/>
                            </Col>
                        </Row>


                            <button
                              style={{padding:"7px", float:"right"}}
                              onClick={() => this.goToCustomRoute()}>Submit!
                              </button>


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

    handleSubmit( start, end ){
      var callback = (res, directions) => {
        this.setState({
          coords: res[1],
          start: start,
          end: end,

        });
      }

      backend.getRoute(start, end, [], callback);

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

        // I can't get firebase to cooperate if window changes to newly added place for some reason
        // window.location = '/route/'+this.state.start+'-'+this.state.end;
    }

    createRouteCard(route){
        return (
            <Col lg={3} Col md={4} Col sm={6}>
                <div className="card">
                    <Link to={'/route/'+route.routeId}>
                    <img className="card-img-top" src={route.image} alt="Card image cap"/>
                    <div className="card-block">
                        <h4 className="card-title">{route.start} to {route.end} </h4>
                        <p className="card-text">Views: {route.views}</p>
                    </div>
                    </Link>
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
