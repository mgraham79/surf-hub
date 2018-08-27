import React from "react";
import "./Nav.css";
import {Link} from "react-router-dom"
import withAuth from "../withAuth"
import AuthService from '../AuthService';
import logo from "./SurfHub_Nav_Logo.png";

const Auth = new AuthService();
var handleLogout = () => {
  Auth.logout();
  window.location.reload();
};

const Nav = (props) => (


  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/Splash"><img src={logo} /></a>
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
        {/* <li className="nav-item">
          <a className="nav-link" href="#">Beach Cams</a>
        </li> */}
        <li className="nav-item">
          <Link to="/Videos"><a className="nav-link" >Videos</a></Link>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">Surf Rentals</a>
        </li> */}
        {/* <li className="nav-item">
          <a className="nav-link" href="#">Good Eats</a>
        </li> */}
        <li className="nav-item">
          <Link to="/profile/My"><a className="nav-link">My Profile</a></Link>        
        </li>
        <li className="nav-item">
          <Link to="/editprofile"><a className="nav-link">Edit Profile</a></Link>        
        </li>
        <li className="nav-item">
          <Link to="/"><a onClick={handleLogout}className="nav-link">Logout</a></Link>
        </li>
        
      </ul>
      
{props.isInstructor ? <Link to="/goAvailable"><button className="btn btn-outline-success my-2 my-sm-0" type="button">Go Available</button></Link>:<button onClick={()=>alert("You do not have Instructor privileges")} className="btn btn-outline-danger my-2 my-sm-0" type="button">Go Available</button>}
</div>
</nav>

    );
    
    export default withAuth(Nav);
