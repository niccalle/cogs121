import React, { Component } from 'react';
import RouteSearch from './RouteSearch'
import TopRoutes from "./TopRoutes"
import logo from './logo.svg';
import { Link } from "react-router-dom";
import './App.css';
import { browserHistory } from 'react-router'

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
          <div className="App-header">
            <div className="logo">
              <nav>
                <ul className="account-settings">
                  <li className="li-settings">
                    <div className="div-settings">
                      <img
                        src="/logo-white.png"
                        style={
                          {
                            height:"90px",
                            width: "60px",
                            paddingBottom: "30px"
                          }
                        }
                      />
                    </div>
                  </li>
                  <li className="li-settings">
                    <div className="div-settings">
                      <h1 className="title">routep.review</h1>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
