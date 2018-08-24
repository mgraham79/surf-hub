import React from "react";
import "./Nav.css";
import {Link} from "react-router-dom"

const Nav = () => (


  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/Splash">SURF HUB</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/home"><a className="nav-link">My Hub <span className="sr-only">(current)</span></a></Link>
        </li>
        <li className="nav-item">
        <Link to="/Report"><a className="nav-link">Surf Reports</a></Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Beach Cams</a>
        </li>
        <li className="nav-item">
          <Link to="/Videos"><a className="nav-link" >Videos</a></Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Surf Rentals</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Good Eats</a>
        </li>
        
      </ul>
      
          <Link to="/goAvailable"><button className="btn btn-outline-success my-2 my-sm-0" type="button">Go Available</button></Link>
</div>
</nav>

    );
    
    export default Nav;
