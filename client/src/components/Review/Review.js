import React, { Component } from "react";
import withAuth from "../withAuth";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import SocketFormComponent from "../SocketForm/SocketFormComponent";
import "./Review.css";
import { sockets } from "../../utils/Sockets";
import FindInstructorButton from "../findInstructorButton/FindInstructorButton";

class Review extends Component {
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
    sessionStarted: false,
    instructorReserved: false,
    chatting: false,
    reviewText: ""
  };

  handleCreateLesson = () => {
    console.log("clicked create lesson");
    API.saveSession({
      clientID: localStorage.getItem("user"),
      instructorID: this.props.match.params.id
    }).then(result => {
      this.setState({ sessionStarted: true });
      console.log(result.data._id);
    });
    sockets.sendMessage({
      text: `User Id ${localStorage.getItem(
        "user"
      )} created a session... Waiting for reply to start`,
      to: this.props.match.params.id
    });
    API.updateFieldUser(this.props.match.params.id, { reserved: true })
      .then(result => {
        this.setState({ instructorReserved: true });
      })
      .catch(err => console.log(err));
  };

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
        bio: res.data.bio,
        instructorReserved: res.data.reserved
      });
    });
  }

  handleButtonChat = () => {
    if (!this.state.chatting) {
      this.setState({ chatting: true });
    } else {
      this.setState({ chatting: false });
    }
  };

  render() {
    console.log(this.state);
    if (!this.state.chatting) {
      var buttonChat = (
        <button
          onClick={this.handleButtonChat}
          type="button"
          className="btn-primary"
        >
          Start Chat
        </button>
      );
    } else {
      var buttonChat = (
        <button
          onClick={this.handleButtonChat}
          type="button"
          className="btn-primary"
        >
          Close Chat
        </button>
      );
    }

    if (!this.state.instructorReserved && this.state.chatting) {
      var buttonSession;
      if (!this.state.sessionStarted) {
        buttonSession = (
          <button
            type="button"
            onClick={this.handleCreateLesson}
            className="btn-primary btn-success"
          >
            Create Lesson With This Instructor
          </button>
        );
      } else {
        buttonSession = (
          <button type="button" className="btn-primary btn-danger">
            End Lesson With This Instructor
          </button>
        );
      }
    } else {
      var buttonSession = (
        <button
          type="button"
          onClick={this.handleCreateLesson}
          className="btn-primary btn-secondary"
          disabled
        >
          Create Lesson With This Instructor
        </button>
      );
    }

    return (
      <div>
        <Nav />
        <div className="container Profile">
          {this.props.isInstructor ? <div /> : <FindInstructorButton />}
          <div id="bg">
            <div className="w3-content w3-margin-top" id="w3-content">
              <div className="w3-row-padding">
                <div className="w3-third">
                  <div className="w3-white w3-text-grey w3-card-4">
                    <div className="w3-display-container">
                      <img
                        id="userphoto"
                        src={this.state.picURL}
                        alt="Avatar"
                      />
                      <div className="w3-display-top w3-container w3-text-black">
                        <h2>
                          <b>
                            <span id="user-name">
                              {this.state.firstName +
                                " " +
                                this.state.middleInitial +
                                " " +
                                this.state.lastName}
                            </span>
                          </b>
                        </h2>
                      </div>
                    </div>

                    <div className="w3-container">
                      <p>
                        <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue" />
                        <span id="user-email">{this.state.email}</span>
                      </p>
                      <hr />

                      <p>
                        <b>
                          <i class="fa fa-home fa-fw w3-margin-right w3-large text-dark-blue" />
                          Location:{" "}
                        </b>
                        <span id="user-location">{this.state.location}</span>
                      </p>
                      <hr />
                    </div>

                    <div className="w3-container">
                      <p>
                        <b>
                          <i className="fa fa-home fa-fw w3-margin-right w3-large text-dark-blue" />
                          Board Type:{" "}
                        </b>
                        <span id="board-type">{this.state.board}</span>
                      </p>
                      <hr />

                      <p>
                        <b>
                          <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue" />
                          Experience:{" "}
                        </b>
                        <span id="experience">{this.state.exp}</span>
                      </p>
                      <hr />
                    </div>

                    <div className="w3-container">
                      <p>
                        <b>
                          <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue" />
                          Favorite Beach:{" "}
                        </b>
                        <span id="favBeaches">{this.state.favBeaches}</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="w3-twothird">
                  <div className="w3-container w3-card w3-light-gray w3-margin-bottom">
                    <h2 className="w3-text-grey w3-padding-16">
                      <i className="fa fa-clipboard fa-fw w3-margin-right w3-xxlarge text-dark-blue" />
                      Review
                    </h2>

                    <strong>Write a review</strong>

                    <textarea
                      rows="5"
                      cols="63"
                      className="myReview"
                      name="reviewText"
                      value={this.state.reviewText}
                      placeholder="Write your review here"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Review);
