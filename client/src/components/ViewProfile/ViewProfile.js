import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Nav from "../Nav"
import SocketFormComponent from "../SocketForm/SocketFormComponent"
import "./ViewProfile.css";
import {sockets} from "../../utils/Sockets"

class ViewProfile extends Component {

  state = {
    instructorId: "",
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
    connect: false,
    sessionStarted: false
  };

  handleCreateLesson = () => {
    console.log("clicked create lesson")
    API.saveSession({clientID:localStorage.getItem('user'), instructorID: this.props.match.params.id})
    .then(result=>{
      this.setState({sessionStarted:true})
      console.log(result.data._id)
    })
    sockets.sendMessage({
      text: `User Id ${localStorage.getItem('user')} created a session... Waiting for reply to start`,
      to: this.props.match.params.id
    })
  }


  componentDidMount() {
    API.getUser(this.props.match.params.id).then(res => {
      this.setState({
        instructorId: res.data._id,
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

  render() {
    console.log(this.state);
    var buttonSession;
    if(!this.state.sessionStarted){
      buttonSession=<button type="button" onClick={this.handleCreateLesson} className="btn-primary btn-success">Create Lesson With This Instructor</button>
    }
    else{
      buttonSession=<button type="button" className="btn-primary btn-danger">End Lesson With This Instructor</button>
    }

    return (
      <div>
        <Nav />
        <div className="container Profile">
          <div className="w3-content w3-margin-top" id="w3-content">
            <div className="w3-row-padding">
              <div className="w3-third">
                <div className="w3-white w3-text-grey w3-card-4">
                  <div className="w3-display-container">
                    <img id="userphoto" src={this.state.picURL} alt="Avatar" />
                    <div className="w3-display-top w3-container w3-text-black">
                      <h2>
                        <b>
                          <span id="user-name">{this.state.firstName + " " + this.state.middleInitial + " " + this.state.lastName}</span>
                        </b>
                      </h2>
                    </div>
                  </div>

                  <div className="w3-container">
                    <p>
                      <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue"></i>
                      <span id="user-email">{this.state.email}</span>
                    </p>
                    <hr />

                    <p>
                      <b>
                        <i class="fa fa-home fa-fw w3-margin-right w3-large text-dark-blue"></i>Location: </b>
                      <span id="user-location">{this.state.location}</span>
                    </p>
                    <hr />
                  </div>

                  <div className="w3-container">
                    <p>
                      <b>
                        <i className="fa fa-home fa-fw w3-margin-right w3-large text-dark-blue"></i>Board Type: </b>
                      <span id="board-type">{this.state.board}</span>
                    </p>
                    <hr />

                    <p>
                      <b>
                        <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue"></i>Experience: </b>
                      <span id="experience">{this.state.exp}</span>
                    </p>
                  </div>
                  <hr />

                  <p>
                    <b>
                      <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue"></i>Favorite Beach: </b>
                    <span id="favBeaches">{this.state.favBeaches}</span>
                  </p>
                </div>
                <hr />
              </div>


              <div className="w3-twothird">
                <div className="w3-container w3-card w3-light-gray w3-margin-bottom">
                  <h2 className="w3-text-grey w3-padding-16">
                    <i className="fa fa-clipboard fa-fw w3-margin-right w3-xxlarge text-dark-blue"></i>About Me</h2>
                  <span id="myBio">{this.state.bio}</span>
                </div>
                <button type="button" className="btn-primary">Start Chat</button>
                {buttonSession}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <SocketFormComponent instructor={this.props.match.params.id}/>
        </div>
      </div>
    )
  }
}

export default withAuth(ViewProfile);