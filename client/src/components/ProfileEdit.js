import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import "./ProfileEdit.css";

class ProfileEdit extends Component {

    state = {
        userID: "",
        picURL: "",
        firstName: "",
        middleInitial: "",
        lastName: "",
        email: "",
        location: "",
        board: "",
        exp: "",
        favBeaches: "",
        bio: "",
    };

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                userID: res.data._id,
                picURL: res.data.picURL,
                firstName: res.data.firstName,
                middleInitial: res.data.middleInitial,
                lastName: res.data.lastName,
                email: res.data.email,
                location: res.data.location,
                board: res.data.board,
                exp: res.data.exp,
                favBeaches: res.data.favBeaches,
                bio: res.data.bio
            })
        });
    }

    handleSubmitButton = event => {
        event.preventDefault();
        API.updateFieldUser(this.state.userID, this.state).then(res => {
            console.log(this.state)
            this.setState({
                picURL: this.state.picURL,
                firstName: this.state.firstName,
                middleInitial: this.state.middleInitial,
                lastName: this.state.lastName,
                email: this.state.email,
                location: this.state.location,
                board: this.state.board,
                exp: this.state.exp,
                favBeaches: this.state.favBeaches,
                bio: this.state.bio
            })
        });
        alert("Your changes have been saved");
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
                            <h2 id="title-text">Edit Profile</h2>
                            <form onChange={this.handleInputChange} className="signup">
                                <div className="form-group">
                                    <label className="text" for="email">Email Address (required)</label>
                                    <input type="email" className="form-control" name="email" value={this.state.email} placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label className="text" for="password">Password (required)</label>
                                    <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label className="text" for="firstName">First Name (required)</label>
                                    <input type="text" className="form-control" name="firstName" value={this.state.firstName} placeholder="First name" />
                                </div>
                                <div className="form-group">
                                    <label className="text" for="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" value={this.state.lastName} placeholder="Last name" />
                                </div>
                                <div className="form-group">
                                    <label className="text" for="middleInitial">Middle Initial</label>
                                    <input type="text" className="form-control" name="middleInitial" value={this.state.middleInitial} placeholder="Middle Initial" />
                                </div>
                                <div className="form-group">
                                    <label className="text" for="picURL">Profile Picture URL</label>
                                    <input type="text" className="form-control" name="picURL" value={this.state.picUrl} placeholder="picURL" />
                                </div>
                                <div className="form-group">
                                    <label className="text" for="location">Zip Code</label>
                                    <input type="text" className="form-control" name="location" value={this.state.location} placeholder="Zip Code" />
                                </div>
                                <div className="form-group">
                                    <label className="text" for="boardType">Board Type / Preference</label>
                                    <br />
                                    <div className="dropList">
                                        <select name="board">
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
                                    <label className="text" for="exp">Experience</label>
                                    <br />
                                    <div className="dropList">
                                        <select name="exp">
                                            <option value="Less than 1 year (I'm a Newb)">Less than 1 year (I'm a Newb)</option>
                                            <option value="1-2 years (I can hang)">1-2 years (I can hang)</option>
                                            <option value="3+ years (I'm a total pro, bro!)">3+ years (I'm a total pro, bro!)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="text" for="favBeaches">Favorite Beach</label>
                                    <input type="text" className="form-control" name="favBeaches" value={this.state.favBeaches} placeholder="Favorite Beach" />
                                </div>
                                <p>
                                    <label>Bio</label>
                                    <textarea rows='8' cols='100' className="myBio" name="myBio" value={this.state.bio} placeholder="Tell us a little about yourself"></textarea>
                                </p>
                                <label for="true_false_radio">I am interested in giving lessons</label>
                                <p>
                                    <input type="radio" name="true" onChange={this.handleRadioButton} value='option1' checked={this.state.instructor} /> <label for="HTML news">Totally!</label>
                                </p>
                                <p>
                                    <input type="radio" name="true" onChange={this.handleRadioButton} value='option2' checked={!this.state.instructor} /> <label for="HTML news">No way!</label>
                                </p>
                                <div style={{ display: "none" }} id="alert" className="alert alert-danger" role="alert">
                                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                    <span className="sr-only">Error:</span>
                                    <span className="msg"></span>
                                </div>
                                <button className="btn btn-primary" id="submit-btn" onClick={this.handleSubmitButton}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
        )
    };
};

export default withAuth(ProfileEdit);
