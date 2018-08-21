import React, { Component } from "react";
import "./Signup.css";
import AuthService from '../AuthService';
import API from '../../utils/API';

class Signup extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }
    
    componentWillMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/');
        }
    }
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        middleInitial: "",
        picURL: "",
        location: "",
        boardType: "",
        exp: "",
        favBeaches: "",
        myBio: "",
        instructor: false
    };

    handleRadioButton = event => {
        event.target.value === 'option2' ? this.setState({ instructor: false }) : this.setState({ instructor: true })
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
    
        // Updating the input's state
        this.setState({
          [name]: value
        });
      };
    
      handleFormSubmit = event => {
        event.preventDefault();
        API.saveUser({ ...this.state })
          .then(res => {
            console.log(res.data);
            // once the user has signed up
            // send them to the login page
            this.props.history.replace('/login');
          })
          .catch(err => alert(err));
      };


    createUser = (e)=>{
        e.preventDefault()
        //var newUser = [firstName]
        console.log(this)
    }


    render() {
        return (
        <body className="login-body">
            <nav className="navbar navbar-default" id="nav-cover">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="/">
                            <img src="" alt="Surf Hub Logo" />
                        </a>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h2 id="title-text">Sign Up Form</h2>
                        <form onChange={this.handleInputChange} className="signup">
                            <div className="form-group">
                                <label className="text" for="email">Email Address (required)</label>
                                <input type="email" className="form-control" name="email" value={this.state.email}placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label className="text" for="password">Password (required)</label>
                                <input type="password" className="form-control" name="password" value={this.state.password}placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label className="text" for="firstName">First Name (required)</label>
                                <input type="text" className="form-control" name="firstName" value={this.state.firstName}placeholder="First name" />
                            </div>
                            <div className="form-group">
                                <label className="text" for="lastName">Last Name</label>
                                <input type="text" className="form-control" name="lastName" value={this.state.lastName}placeholder="Last name" />
                            </div>
                            <div className="form-group">
                                <label className="text" for="middleInitial">Middle Initial</label>
                                <input type="text" className="form-control" name="middleInitial" value={this.state.middleInitial}placeholder="Middle Initial" />
                            </div>
                            <div className="form-group">
                                <label className="text" for="picURL">Profile Picture URL</label>
                                <input type="text" className="form-control" name="picURL" value={this.state.picUrl}placeholder="picURL" />
                            </div>
                            <div className="form-group">
                                <label className="text" for="location">Zip Code</label>
                                <input type="text" className="form-control" name="location" value={this.state.location}placeholder="Zip Code" />
                            </div>
                            <div className="form-group">
                                <label className="text" for="boardType">Board Type / Preference</label>
                                <br />
                                <div className="dropList">
                                    <select name="boardType">
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
                                <label className="text" for="exp">Experience</label>
                                <br />
                                <div className="dropList">
                                    <select name="exp">
                                        <option value="1">Less than 1 year (I'm a Newb)</option>
                                        <option value="2">1-2 years (I can hang)</option>
                                        <option value="3">3+ years (I'm a total pro, bro!)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text" for="favBeaches">Favorite Beach</label>
                                <input type="text" className="form-control" name="favBeaches" value={this.state.favBeaches}placeholder="Favorite Beach" />
                            </div>
                            <p>
                                <label>Bio</label>
                                <textarea rows='8' cols='100' className="myBio" name="myBio" value={this.state.myBio}placeholder="Tell us a little about yourself"></textarea>
                            </p>
                            <label for="true_false_radio">I am interested in giving lessons</label>
                            <p>
                                <input type="radio" name="true" onChange={this.handleRadioButton} value='option1' checked={this.state.instructor}/> <label for="HTML news">Totally!</label>
                            </p>    
                            <p>
                                <input type="radio" name="true" onChange={this.handleRadioButton} value='option2' checked={!this.state.instructor} /> <label for="HTML news">No way!</label>
                            </p>
                            <div style={{ display: "none" }} id="alert" className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span className="sr-only">Error:</span>
                                <span className="msg"></span>
                            </div>
                            <button className="btn btn-primary" id="submit-btn" onClick={this.handleFormSubmit}>Sign Up</button>
                            <br />
                            <br />
                            <p className="text">Already have an account? Log in
                            <a id="btn-link" href="/login"> here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </body>
        )};
};

export default Signup;