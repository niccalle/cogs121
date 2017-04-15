import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
// import { ButtonToolbar } from 'react-bootstrap';

import logo from './logo.svg';
import './App.css';

class RouteImg extends Component{
    render() {
        return <img src={this.props.src} onClick={this.props.handleClick} />
    }
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            images: [],
            imgs: [],
            index: 0
        }
        this.getImages();
    }
    render() {
        return (
            <div className="App">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <div className="container">
                    <ul>
                        {this.state.imgs[this.state.index]}
                    </ul>
                </div>

            </div>
        );
    }
    renderImg(i){
        var style = {
            "display": i == this.state.index ? "auto" : "none"
        }
        return <RouteImg key={i} src={this.state.images[i]} style={style} handleClick={() => this.handleClick()}  />
    }
    handleClick() {
        console.log(this);
        this.setState({index: (this.state.index + 1)%this.state.images.length});
    }
    getImages(){
        var s = this;
        fetch("/bikeRoute").then(function(response){
            return response.json();
        }).then(function(j){
            var imgs = []

            for (var i in j){
                imgs.push(<RouteImg key={i} src={j[i]} handleClick={() => s.handleClick()}  />);
            }

            s.setState({images: j, imgs: imgs})
        })
    }
}

export default App;
