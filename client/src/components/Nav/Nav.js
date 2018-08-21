import React from "react";
import "./Nav.css";

const Nav = () => (


  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">SURF HUB</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">My Hub <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Surf Reports</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Beach Cams</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./Videos">Instructional Videos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Surf Rentals</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Good Eats</a>
        </li>
        
      </ul>
      
          <button class="btn btn-outline-success my-2 my-sm-0" type="button">Find Students</button>
</div>
</nav>

    );
    
    export default Nav;
