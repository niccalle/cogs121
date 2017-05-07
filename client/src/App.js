import React, { Component } from 'react';
import RouteSearch from './RouteSearch'

import logo from './logo.svg';
import './App.css';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>

                <div className="App">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                    <div className="App-header">
                        <div className="logo-container">
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <div className="middle-align"></div>
                        <div className="navigation-container">
                            <nav>
                                <ul className="account-settings">
                                    <li className="li-settings">
                                        <div className="div-settings">
                                            <a className="a-settings">My Account</a>
                                        </div>
                                    </li>
                                    <li className="li-settings">
                                        <div className="div-settings">
                                            <a className="a-settings">My Routes</a>
                                        </div>
                                    </li>
                                    <li className="li-settings">
                                        <div className="div-settings">
                                            <a className="a-settings">Settings</a>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                </div>
                </div>
                <RouteSearch/>
            </div>
        );
    }

}

export default App;
