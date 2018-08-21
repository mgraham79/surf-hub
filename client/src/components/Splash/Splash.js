
import React from 'react';
import './Splash.css';


const Splash = () => (
<div className="container">
  <div id="rtLogin"><a href="../Login">Log In</a> | <a href="../Signup">Sign Up</a></div>
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
        <div id="rtLogin"><img src="/sfLogo.png" alt="Surf Hub" /></div>
    </div>
    
</div>
);
export default Splash;