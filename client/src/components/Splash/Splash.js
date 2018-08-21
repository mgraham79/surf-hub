
import React from "react";
import "./Splash.css";

const Splash = () => (
<div class="container">
    <div>
        <form class="form-inline">
            <div class="form-group mb-2">
                <label for="staticEmail2" class="sr-only">Email</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div class="form-group mx-sm-3 mb-2">
                    <label for="inputPassword2" class="sr-only">Password</label>
                    <input type="password" class="form-control" id="inputPassword2" placeholder="Password" />
            </div>
                    <button type="submit" class="btn btn-primary mb-2">Login</button>
        </form>
    </div>
    <div class="jumbotron" id="jumbo">
        <h1 class="display-4">Surf Hub</h1>
        <h2>Connecting Barney's with expert surfers</h2>
        <ul>
            <li>Teach surfing and make money!</li>
            <li>Find aninstructor &amp; learn to surf</li>
            <li>Check the surf report</li>
            <li>Links to beach webcams</li>
            <li>Find surf equipment rentals</li>
        </ul>
        <a class="btn btn-primary btn-lg" href="#" role="button">REGISTER</a>
    </div>
    
</div>
);
export default Splash;