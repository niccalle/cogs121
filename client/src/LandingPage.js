import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import {View, Image, StyleSheet} from 'react-native';

class LandingPage extends Component{

    render(){
        
        return(

            <div className="background"> 
                <h1 className="landing-title">RouteP.review</h1>

                <h1 className="tagline">Preview your route before taking it</h1>    

                <h1 className="description">Just enter locations and a video is automatically produced of your route.</h1>

                <Link to={'/toproutes'} style={{ textDecoration:"none" }}> 
                    <h2 className="top-routes"><span>View Top Routes</span></h2>
                </Link>
            </div>

        )

    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1, 
        
        width: null,
        height: null,
    }
});
export default LandingPage;
