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
import StarRatingComponent from 'react-star-rating-component';
var backend = new Backend();
var FontAwesome = require('react-fontawesome');

const propTypes = {
}

class SelectRouteModal extends Component{
  constructor() {
    this.state = {
      waypoints: [],
      showModal: false,
      start: '',
      end: '',
      routePreviewed: false,
    };
  }
  render() {
    return (
      <Modal
        isOpen={this.state.showModal}
        onAfterOpen={() => {}}
        onRequestClose={() => this.closeModal()}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="container">
          <div style={{padding: "5px"}}>
            <h2 ref="subtitle">Create A Route
              <Button
                bsStyle="danger"
                style={{padding:"8px", float:"right"}}
                onClick={() => this.closeModal()}>
                Close
              </Button>
            </h2>
          </div>
          <Row>
            <Col md={6}>
              <div style={{padding:"7px", width: "100%", height: "300px", margin: "auto"}}>
                <DirectionsExample start={start} end={end} waypoints={[]} curr={start} index={0}/>
              </div>
            </Col>
            <Col md={6}>
              <Search
                updateStart={(start) => {this.setState({start: start})}}
                updateEnd={(end) => {this.setState({end: end})}}
                handleClick={(st, end) => this.handleSubmit(st, end)}
              />
            </Col>
          </Row>
          <Button
            bsStyle="primary"
            style={{padding:"10px", float:"right"}}
            onClick={() => this.goToCustomRoute()}
            disabled={!this.state.routePreviewed}>
            View Video!
          </Button>
        </div>
      </Modal>
    );
  }
}
