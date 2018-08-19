import React from "react";
import "./Signup.css";

const Signup = () => (
    <body className="login-body">
        <nav className="navbar navbar-default" id="nav-cover">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a href="/">
                        <img src="images/DevSpace_TopBar.png" alt="DevSpace logo"/>
                    </a>
                </div>
            </div>
        </nav>
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2 id="title-text">Sign Up Form</h2>
                    <form className="signup">
                        <div className="form-group">
                            <label className="text" for="email-input">Email Address (required)</label>
                            <input type="email" className="form-control" id="email-input" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="password-input">Password (required)</label>
                            <input type="password" className="form-control" id="password-input" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="first-name-input">First Name (required)</label>
                            <input type="text" className="form-control" id="name-input" placeholder="First name"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="last-name-input">Last Name</label>
                            <input type="text" className="form-control" id="name-input" placeholder="Last name"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="middle-initial-input">Middle Initial</label>
                            <input type="text" className="form-control" id="name-input" placeholder="Middle Initial"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="photo-url-input">Profile Picture URL</label>
                            <input type="text" className="form-control" id="photo-url-input" placeholder="PhotoUrl"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="location-input">Zip Code</label>
                            <input type="text" className="form-control" id="location-input" placeholder="Zip Code"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="languages-input">Languages</label>
                            <input type="text" className="form-control" id="languages-input" placeholder="Languages"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="board-type-input">Surfboard Preference</label>
                            <br/>
                            <div className="dropList">
                                <select id="board-type-input">
                                    <option value="Bodyboard">Bodyboard</option>
                                    <option value="Kite Surf">Kite Surf</option>
                                    <option value="Longboard">Longboard</option>
                                    <option value="Shortboard">Shortboard</option>
                                    <option value="SUP">SUP (Stand-Up Paddleboard)</option>
                                    <option value="Windsurf">Windsurf</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="text" for="position-input">Position</label>
                            <input type="text" className="form-control" id="position-input" placeholder="Position"/>
                        </div>
                        <div className="form-group">
                            <label className="text" for="degree-input">Degree</label>
                            <br/>
                            <div className="dropList">
                                <select id="degree-input">
                                    <option value="NA / Self-Taught">NA / Self-Taught</option>
                                    <option value="Certificate">Certificate</option>
                                    <option value="Associate's">Associate's</option>
                                    <option value="Bachelor's">Bachelor's</option>
                                    <option value="Master's">Master's</option>
                                    <option value="Doctorate">Doctorate</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="text" for="experience-input">Experience</label>
                            <br/>
                            <div className="dropList">
                                <select id="experience-input">
                                    <option value="Less than 1 year">Less than 1 year</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="3-5 years">3-5 years</option>
                                    <option value="5+ years">5+ years</option>
                                </select>
                            </div>
                        </div>
                        <div style={{display:"none"}} id="alert" className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span className="sr-only">Error:</span>
                            <span className="msg"></span>
                        </div>
                        <button type="submit" className="btn btn-default" id="submit-btn">Sign Up</button>
                        <br/>
                        <p className="text">Already have an account? Log in
                            <a id="btn-link" href="/">here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </body>
);                                                              
                                                                
export default Signup;