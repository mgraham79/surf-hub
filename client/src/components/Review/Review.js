import React, { Component } from "react";
import withAuth from "../withAuth";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import SocketFormComponent from "../SocketForm/SocketFormComponent";
import "./Review.css";
import { sockets } from "../../utils/Sockets";
import FindInstructorButton from "../findInstructorButton/FindInstructorButton";

import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";

class Review extends Component {
  state = {
    userId: "",
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
    reviewerID: "",
    revieweeID: "",
    reviewText: "",
    reviewRating: 0,
    reviewDate: Date(2018, 7),
    sessionDateForReview: Date(2018, 7),
    sessionId: "",
    clientName: "",
    clientID: "",
    instructorName: "",
    instructorID: "",
    sessionStart: Date(2018, 7),
    sessionEnd: Date(2018, 7),
    ended: false,
    ratingsAll: [],
    reviewsAll: []
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ reviewRating: nextValue });
  }

  componentDidMount() {
    // Getting the session that was stored in local storage when the session ended (App.js)
    API.getSession(localStorage.getItem("sessionIdLocStor")).then(res => {
      this.setState({
        sessionId: res.data._id,
        clientName: res.data.clientName,
        clientID: res.data.clientID,
        instructorName: res.data.instructorName,
        instructorID: res.data.instructorID,
        sessionStart: res.data.sessionStart,
        sessionEnd: res.data.sessionEnd,
        ended: res.data.ended
      });
      if (this.state.reviewerID === "") {
        // The reviewer ID is the ID of the current user
        this.setState({ reviewerID: this.props.user.id });

        // If the ID of the current user equals the clientID then the revieweeID equals the instructorID
        // else the reviewee ID equals the clientID
        // If the current user is the client
        if (this.props.user.id === this.state.clientID) {
          this.setState({ revieweeID: this.state.instructorID });
          // If the current user is the instructor
        } else {
          this.setState({ revieweeID: this.state.clientID });
        }
      }
      // Setting the date from the session
      const dses = this.state.sessionEnd;
      this.setState({ sessionDateForReview: dses });
    });

    // The setTimeout is needed for revieweeID to be defined
    setTimeout(function() {
      profileInfo();
    }, 1000);
    var profileInfo = () => {
      API.getUser(this.state.revieweeID).then(res => {
        this.setState({
          userId: res.data._id,
          picURL: res.data.picURL,
          firstName: res.data.firstName,
          middleInitial: res.data.middleInitial,
          lastName: res.data.lastName,
          email: res.data.email,
          location: res.data.location,
          board: res.data.board,
          exp: res.data.exp,
          ratingsAll: res.data.ratingsAll,
          reviewsAll: res.data.reviewsAll,
          favBeaches: res.data.favBeaches,
          bio: res.data.bio,
          reserved: res.data.reserved
        });
      });
    };
  } // end of component did mount

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });

    // console.log(this.state)
  };

  handleReviewSubmit = event => {
    event.preventDefault();

    // Setting the reviewDate state when the form is submitted.
    const dnow = new Date(Date.now()).toISOString();
    this.setState({ reviewDate: dnow });

    // The setTimeout is needed for revieweeID to be defined
    setTimeout(function() {
      saveDelay();
    }, 1000);
    var saveDelay = () => {
      API.saveReview({ ...this.state }).then(res => {
        //console.log(this.state);
        alert("Your changes have been saved");

        // Adding the ratings to the ratingsAll array
        let newRatingsAll = this.state.ratingsAll;
        let newRating = this.state.reviewRating;
        newRatingsAll.push(newRating);
        this.setState({ ratingsAll: newRatingsAll });

        // Adding the reviews to the reviewsAll array
        let newReviewsAll = this.state.reviewsAll;
        let newReview = this.state.reviewText;
        newReviewsAll.push(newReview);
        this.setState({ reviewsAll: newReviewsAll });

        const newArrayData = {
          ratingsAll: this.state.ratingsAll,
          reviewsAll: this.state.reviewsAll
        };
        API.updateFieldUser(this.state.revieweeID, newArrayData)
          .then(res => {
            console.log("Rating and Review added to Reviewee");
            console.log(res.data);
          })
          .catch(err => console.log(err));

        this.props.history.replace(`/profile/${this.state.userId}`);
      });
    };
  };

  handleNoReview = event => {
    event.preventDefault();
    alert("No Review Submitted");
    this.props.history.replace(`/profile/${this.state.userId}`);
  };

  render() {
    const { reviewRating } = this.state;

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
                    <h2 className="w3-padding-16">
                      <i className="fa fa-clipboard fa-fw w3-margin-right w3-xxlarge text-dark-blue" />
                      Review
                    </h2>
                    <form
                      onChange={this.handleInputChange}
                      className="submitReviwew"
                    >
                      <div className="reviewMargin">Write a review</div>
                      <textarea
                        rows="5"
                        cols="55"
                        className="myReview"
                        name="reviewText"
                        value={this.state.reviewText}
                        placeholder="Write your review here"
                      />
                      <div>
                        <div className="reviewMargin">
                          <h3>
                            Select a Star for an Overall Rating: {reviewRating}
                          </h3>
                          <div style={{ fontSize: 50 }}>
                            <StarRatingComponent
                              name="rate1"
                              starCount={5}
                              value={reviewRating}
                              onStarClick={this.onStarClick.bind(this)}
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-primary"
                          id="submit-review"
                          onClick={this.handleReviewSubmit}
                        >
                          Submit
                        </button>
                        <br />
                        <button
                          className="btn btn-primary"
                          id="submit-no-review"
                          onClick={this.handleNoReview}
                        >
                          No thanks, I do not want to give a review
                        </button>
                      </div>
                    </form>
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
