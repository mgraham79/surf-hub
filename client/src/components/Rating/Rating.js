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
        ratingsAll: res.data.ratingsAll
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
      const arrAvg = ratingsAll =>
        ratingsAll.reduce((a, b) => a + b, 0) / ratingsAll.length;

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
    const { reviewsRatingAveHalf } = this.state;

    return (
      <div>
        <div className="starsRating">
          <div style={{ fontSize: 50 }}>
            <StarRatingComponent
              name="rate2"
              editing={false}
              renderStarIconHalf={() => <span></span>}
              starCount={10}
              value={reviewsRatingAveHalf}
            />
            <p>Total Number of Reviews: <span style="color:blue">{this.state.reviewsRatingTotNum}</span></p>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Rating);
