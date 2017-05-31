import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends Component{

    render(){

        return(

            <div className="background">
                <div className="landing-title">
                    <h1>RouteP.review</h1>
                </div>

                <Link to={'/toproutes'}>
                    <h2>Top Routes</h2>
                </Link>
            </div>
        )

    }

}
export default LandingPage;
