
import React from 'react';
import './Splash.css';
import {Link} from "react-router-dom"


const Splash = () => (
<div className="container">
  <div id="rtLogin"><Link to="/Login"><a>Log In</a> </Link>| <Link to="/Signup"><a href="/Signup">Sign Up</a></Link></div>
    <div>&nbsp;</div>
    <div className="jumbotron" id="jumbo">
        <h1 className="display-4">Surf Hub</h1>
        <h2>Connecting Barney's with expert surfers</h2>
        <ul>
            <li>Teach surfing and make money!</li>
            <li>Find aninstructor &amp; learn to surf</li>
            <li>Check the surf report</li>
            <li>Links to beach webcams</li>
            <li>Find surf equipment rentals</li>
        </ul>
        <a className="btn btn-primary btn-lg" href="./Signup" role="button">SIGN UP!</a>
        
    </div>
    
</div>
);
export default Splash;