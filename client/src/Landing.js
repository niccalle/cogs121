import React, { Component } from 'react';
import "./Landing.css"
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
class Landing extends Component{
    responseFacebook = (response) => {
        console.log(cookie.getAll());
        if('accessToken' in response)
            this.props.history.push("/home");
    }

    render() {
        return (
            <div id="landing">
                <div className="login-box">
                    <h1>Plan your next great trip</h1>
                    <h2>Route Preview</h2>
                    <FacebookLogin
                       appId="468472356817481"
                       autoLoad={false}
                       fields="name,email,picture"
                       onClick={() => console.log("clicked")}
                       callback={(response) => this.responseFacebook(response)} />
                </div>
            </div>
        )
    }
}
export default Landing;
