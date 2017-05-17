import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TopRoutes.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class SavedRoutes extends Component{
    state = {
        routes: []
    }
    componentDidMount(){
        var routes = []
        var uid = window.firebase.auth().currentUser.uid;
        window.firebase.database().ref("users/"+uid+"/routes/").once("value").then((snapshot) => {
            var routes = [];
            snapshot.forEach(function(childSnapshot){
                window.firebase.database().ref("routes/"+childSnapshot.key+"/").once("value").then((snapshot) => {
                    var start = snapshot.child("start").val();
                    var end = snapshot.child("end").val();
                    var views = snapshot.child("views").val();
                    var image = snapshot.child("image").val();
                    routes.push({routeId: childSnapshot.key, start: start, image: image, end: end, views: views});
                })
            })
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
            <div className="container">
                {cards}
            </div>
        )
    }

    createRouteCard(route){
        return (
            <Col md={4}>
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
}
export default SavedRoutes;
