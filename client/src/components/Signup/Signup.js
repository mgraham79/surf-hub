import React, { Component } from "react";
import "./Signup.css";
import AuthService from '../AuthService';
import API from '../../utils/API';
import LogoNav from "../LogoNav";

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
        picURL: "https://vignette.wikia.nocookie.net/doawk/images/1/14/Placeholder_person.jpg/revision/latest?cb=20100502070209",
        location: "",
        board: "",
        exp: "",
        favBeaches: "",
        bio: "",
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
        console.log(this.state)
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


    render() {
        return (
            //<body className="login-body">
            <div>
                <LogoNav />
                <div className="container" id="loginSize">&nbsp;<br />
                    <div id="bg">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <h2 id="title-text">Sign Up Form</h2>
                                <form onChange={this.handleInputChange} className="signup">
                                    <div className="form-group">
                                        <label className="text" for="email"><strong>Email</strong> (required)</label>
                                        <input type="email" className="form-control" name="email" value={this.state.email} placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="password"><strong>Password</strong> (required)</label>
                                        <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="firstName"><strong>First Name</strong> (required)</label>
                                        <input type="text" className="form-control" name="firstName" value={this.state.firstName} placeholder="First name" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="lastName"><strong>Last Name</strong></label>
                                        <input type="text" className="form-control" name="lastName" value={this.state.lastName} placeholder="Last name" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="middleInitial"><strong>Middle Initial</strong></label>
                                        <input type="text" className="form-control" name="middleInitial" value={this.state.middleInitial} placeholder="Middle Initial" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="picURL"><strong>Profile Picture URL</strong></label>
                                        <input type="text" className="form-control" name="picURL" value={this.state.picUrl} placeholder="picURL" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="location"><strong>Zip Code</strong></label>
                                        <input type="text" className="form-control" name="location" value={this.state.location} placeholder="Zip Code" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="boardType"><strong>Board Type / Preference</strong></label>
                                        <br />
                                        <div className="dropList">
                                            <select name="board" id="exp">
                                                <option value="Bodyboard">Bodyboard</option>
                                                <option value="Kite Surf">Kite Surf</option>
                                                <option value="Longboard">Longboard</option>
                                                <option value="Shortboard">Shortboard</option>
                                                <option value="SUP (Stand-Up Paddleboard)">SUP (Stand-Up Paddleboard)</option>
                                                <option value="Windsurf">Windsurf</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="exp"><strong>Experience</strong></label>
                                        <br />
                                        <div className="dropList">
                                            <select name="exp" id="exp">
                                                <option value="Less than 1 year (I'm a Newb)">Less than 1 year (I'm a Newb)</option>
                                                <option value="1-2 years (I can hang)">1-2 years (I can hang)</option>
                                                <option value="3+ years (I'm a total pro, bro!)">3+ years (I'm a total pro, bro!)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="text" for="favBeaches"><strong>Favorite Beach</strong></label>
                                        <input type="text" className="form-control" name="favBeaches" value={this.state.favBeaches} placeholder="Favorite Beach" />
                                    </div>
                                    <p>
                                        <label id="lab"><strong>Bio</strong></label>
                                        <textarea rows='5' cols='90' className="myBio" name="bio" value={this.state.bio} placeholder="Tell us a little about yourself"></textarea>
                                    </p>
                                    <label for="true_false_radio"><strong>I am interested in giving lessons</strong></label>
                                    <p>
                                        <input type="radio" name="true-false" onChange={this.handleRadioButton} value='option1' checked={this.state.instructor} /> <label for="HTML news" id="lab"><strong>Totally!</strong></label> &nbsp; <input type="radio" name="true-false" onChange={this.handleRadioButton} value='option2' checked={!this.state.instructor} /> <label for="HTML news" id="lab"><strong>No way!</strong></label>
                                    </p>
                                    <div style={{ display: "none" }} id="alert" className="alert alert-danger" role="alert">
                                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                        <span className="sr-only">Error:</span>
                                        <span className="msg"></span>
                                    </div>
                                    <button className="btn btn-primary" id="submit-btn" onClick={this.handleFormSubmit}>Sign Up</button>
                                    <br />
                                    <br />
                                    <p className="text">Already have an account?
                            <a id="btn-link" href="/login">  Log in here</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default Signup;