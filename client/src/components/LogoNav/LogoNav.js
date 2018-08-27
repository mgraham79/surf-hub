import React from "react";
import "./LogoNav.css";
import {Link} from "react-router-dom"
import withAuth from "../withAuth"
import AuthService from '../AuthService';


const Auth = new AuthService();
var handleLogout = () => {
  Auth.logout();
  window.location.reload();
};


const LogoNav = (props) => (


  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/Splash"><img src="../SurfHub_Nav_Logo.png" border="0" /></a>
</nav>

    );
    
    export default LogoNav;
