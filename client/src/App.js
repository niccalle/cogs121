import React, { Component } from 'react';
import RouteSearch from './RouteSearch'
import TopRoutes from "./TopRoutes"
import logo from './logo.svg';
import { Link } from "react-router-dom";
import './App.css';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class App extends Component {
    provider = null

    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            user: null,
            accessToken: ""
        }
    }


    componentDidMount(){
        // window.gapi.signin2.render('g-signin2', {
        //     'scope': 'https://www.googleapis.com/auth/plus.login',
        //     'longtitle': true,
        //     'onsuccess': (g) => this.onSignIn(g)
        //   });
        this.provider = new window.firebase.auth.GoogleAuthProvider();
        this.provider.addScope('https://www.googleapis.com/auth/plus.login');
    }

    onSignIn(google_user){
        console.log("SIGNED IN");
        console.log(google_user);
    }

    handleLogin(){
        window.firebase.auth().signInWithPopup(this.provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(typeof user);
            console.log("token: " + token)
            console.log(user)
            window.firebase.database().ref('users/'+user.uid).update({
                username: user.displayName,
                email: user.email,
            })
            this.setState({authenticated: true, user: user, accessToken: token});

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    render() {
        // const childrenWithProps = React.Children.map(this.props.children,
        //  (child) => React.cloneElement(child, {
        //    authenticated: this.state.authenticated
        //  })
        // );

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
                                    { this.state.authenticated && (
                                    <div>
                                    <li className="li-settings">
                                        <div className="div-settings" onClick={()=>this.handleLogin()}>
                                            <a className="a-settings">LOGOUT</a>
                                        </div>
                                    </li>
                                    <li className="li-settings">
                                        <div className="div-settings">
                                            <a className="a-settings">My Account</a>
                                        </div>
                                    </li>
                                    <li className="li-settings">
                                        <div className="div-settings">
                                            <Link to={'/saved'}> TESTING </Link>
                                        </div>
                                    </li>
                                    <li className="li-settings">
                                        <div className="div-settings">
                                            <a className="a-settings">Settings</a>
                                        </div>
                                    </li>
                                    </div>
                                    )}
                                    {
                                        !this.state.authenticated && (
                                        <li className="li-settings">
                                            <div className="div-settings" onClick={()=>this.handleLogin()}>
                                                <a className="a-settings">LOGIN</a>
                                            </div>
                                        </li>)
                                    }
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
