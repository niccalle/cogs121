import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class RouteImg extends Component{
    render() {
        return <img src={this.props.src} />
    }
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            images: []
        }
        this.getImages();
    }
    render() {
        var imgList = Array();
        for (var i in this.state.images){
            imgList.push(<RouteImg key={i} src={this.state.images[i]}/>)
        }
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <ul>
                    {imgList}
                </ul>

            </div>
        );
    }
    getImages(){
        var s = this;
        fetch("/bikeRoute").then(function(response){
            return response.json();
        }).then(function(j){
            s.setState({images: j})
        })
    }
}

export default App;
