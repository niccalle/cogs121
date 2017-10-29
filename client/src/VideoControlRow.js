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
  videoStatus: PropTypes.string.isRequired,
  playRoute: PropTypes.func.isRequired,
  changeVideo: PropTypes.func.isRequired,
  resetRoute: PropTypes.func.isRequired,
}

class VideoControlRow extends Component{
  render() {
    const {
      videoStatus,
      playRoute,
      changeVideo,
      resetRoute,
    } = this.props;
    return (
      <Row>
        <div className="button-row">
          <Button
            style = {{padding:"7px", width: "15%", margin: "auto", display: "inline"}}
            onClick={() => playRoute()}
            block>
            <FontAwesome
              className='super-crazy-colors'
              name={videoStatus}
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Button>
          <Button
            style = {{padding:"7px", width: "15%", margin: "auto", display: "inline"}}
            onClick={() => changeVideo("ArrowLeft")}
            block>
            <FontAwesome
              className='super-crazy-colors'
              name=" fa-step-backward"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Button>
          <Button
            style = {{padding:"7px", width: "15%", margin: "auto", display: "inline"}}
            onClick={() => changeVideo("ArrowRight")}
            block>
            <FontAwesome
              className='super-crazy-colors'
              name=" fa-step-forward"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Button>
          <Button
            bsStyle="danger"
            style = {{padding:"7px", width: "15%", margin: "auto", display: "inline"}}
            onClick={()=> resetRoute()}
            block>
            <FontAwesome
              className='super-crazy-colors'
              name=" fa-fast-backward"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Button>
          <Button
            bsStyle="warning"
            style = {{padding:"7px", width: "20%", margin: "auto", display: "inline"}}
            onClick={()=> changeVideo("ArrowDown")}
            block>
            <FontAwesome
              className='super-crazy-colors'
              name=" fa-angle-double-down"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            Speed
          </Button>
          <Button bsStyle="warning"
            style = {{padding:"7px", width: "20%", margin: "auto", display: "inline"}}
            onClick={()=> changeVideo("ArrowUp")}
            block>
            <FontAwesome
              className='super-crazy-colors'
              name=" fa-angle-double-up"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            Speed
          </Button>
        </div>
      </Row>
    );
  }
}

VideoControlRow.propTypes = propTypes;
export default VideoControlRow;
