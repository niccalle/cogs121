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
                        <h2>Welcome to React</h2>
                    </div>
                </div>
                <RouteSearch/>
            </div>
        );
    }
}

export default App;
