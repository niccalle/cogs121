import React, { Component } from 'react';
import RouteSearch from './RouteSearch'

import logo from './logo.svg';
import './App.css';
class App extends Component {

    render() {
        return (
            <div>

                <div className="App">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
                    </div>
                </div>
                <RouteSearch/>
            </div>
        );
    }

    componentWillMount() {
        const script = document.createElement("script");

        script.src = "/fbinit.js";
        script.async = true;

        document.body.appendChild(script);
    }
}

export default App;
