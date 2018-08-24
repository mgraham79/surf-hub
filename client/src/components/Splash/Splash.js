
import React, { Component } from 'react';
import './Splash.css';
import { Link } from "react-router-dom"
import AuthService from '../AuthService';

class Splash extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
    }

    componentWillMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        }
    }

    render() {
        return <div className="container">
            <div id="rtLogin"><Link to="/Login"><a>Log In</a> </Link>| <Link to="/Signup"><a href="/Signup">Sign Up</a></Link></div>
            <div>&nbsp;</div>
            <div className="jumbotron" id="jumbo">
                <h1 className="display-4">Surf Hub</h1>
                <h2>Connecting people with expert surfers</h2>
                <ul>
                    <li>Teach surfing and make money!</li>
                    <li>Find an instructor &amp; learn to surf</li>
                    <li>Check surf reports for various beaches</li>
                    <li>Links to beach webcams</li>
                    <li>Find surf equipment rentals</li>
                </ul>
                <a className="btn btn-primary btn-lg" href="/Signup" role="button">SIGN UP!</a>
                <p class="text">Already have an account? Log in <a id="btn-link" href="/Signup">here</a>
                </p>
            </div>

        </div>
    };
}
export default Splash;