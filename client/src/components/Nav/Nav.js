import React from "react";
import "./Nav.css";

const Nav = () => (


  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="./Splash">SURF HUB</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">My Hub <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Surf Reports</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Beach Cams</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Videos">Videos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Surf Rentals</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Good Eats</a>
        </li>
        
      </ul>
      
          <button className="btn btn-outline-success my-2 my-sm-0" type="button">Find Students</button>
</div>
</nav>

    );
    
    export default Nav;
