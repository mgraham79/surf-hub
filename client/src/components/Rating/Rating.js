import React, { Component } from "react";
import withAuth from "../withAuth";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import SocketFormComponent from "../SocketForm/SocketFormComponent";
import "./Rating.css";
import { sockets } from "../../utils/Sockets";
import FindInstructorButton from "../findInstructorButton/FindInstructorButton";

import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";

class Rating extends Component {
  state = {
    userId: "",
    revieweeID: "",
    ratingsAll: [],
    reviewsRatingAve: 0,
    reviewsRatingAveHalf: 0,
    reviewsRatingTotNum: 0
  };

  componentDidMount() {
    // Getting the reviews and ratings for revieweeID
    API.getUser(this.state.revieweeID).then(res => {
      this.setState({
        userId: res.data._id,
        ratingsAll: res.data.ratingsAll,
      });
    });

    // Checking if th array is empty
    if (this.state.ratingsAll.length === 0) {
      this.setState({
        reviewsRatingAve: 0,
        reviewsRatingAveHalf: 0,
        reviewsRatingTotNum: 0
      });
    } else {
      // Calculate the total number of reviews
      const totNumRatings = ratingsAll.length;
      // Calculate the average of the ratings array
      const arrAvg = ratingsAll => ratingsAll.reduce((a, b) => a + b, 0) / ratingsAll.length;

      // Calculate the average of the ratings to the nearest half
      const arrAvgHalf = roundHalf(arrAvg);
      function roundHalf(num) {
        return Math.round(num * 2) / 2;
      }
      this.setState({
        reviewsRatingAve: arrAvg,
        reviewsRatingAveHalf: arrAvgHalf,
        reviewsRatingTotNum: totNumRatings
      });
    }
  }

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
                              starCount={10}
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

export default withAuth(Rating);
