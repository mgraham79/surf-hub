import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import Nav from "./Nav"
import FindInstructorButton from "./findInstructorButton/FindInstructorButton"
import "./Profile.css"
import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";

class Profile extends Component {

  state = {
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
    ratingsAll: [],
    reviewsRatingAve: 0,
    reviewsRatingAveHalf: 0,
    reviewsRatingTotNum: 0
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
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
        ratingsAll: res.data.ratingsAll
      })
    });



    // Checking if th array is empty
    if (this.state.ratingsAll.length === 0) {
      this.setState({
        reviewsRatingAve: 0,
        reviewsRatingAveHalf: 0,
        reviewsRatingTotNum: 0
      });
    } else {
      // Set the ratingsAll array to a new name
      const newRatingsAll = this.ratingsAll
      // Calculate the total number of reviews
      const totNumRatings = this.ratingsAll.length;
      // Calculate the average of the ratings array
      const arrAvg = newRatingsAll =>
      newRatingsAll.reduce((a, b) => a + b, 0) / newRatingsAll.length;

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
    console.log(this.props)
    const { reviewsRatingAveHalf } = this.state;
    return (
      <div>
        <Nav />
        <FindInstructorButton />&nbsp;<br />
        <div className="container Profile">
          
          <div id="bg">
          <div className="w3-content w3-margin-top" id="w3-content">
            <div className="w3-row-padding">
              <div className="w3-third">
                <div className="w3-white w3-text-grey w3-card-4">
                  <div className="w3-display-container">
                    <img id="userphoto" src={this.state.picURL} alt="Avatar" />
                    <div className="w3-display-top w3-container w3-text-black">
                      <h2 id="tag">
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
                    
                    <div className="w3-container">
                    <p>
                      
                    <div className="starsRating">
                    <b>Rating:</b>
                      <div styles={{ fontSize: 50 }}>
                        <StarRatingComponent
                          name="rate2"
                          editing={false}
                          renderStarIconHalf={() => <span></span>}
                          starCount={5}
                          value={reviewsRatingAveHalf}
                        />
                        <p><b>Reviews:</b> <span styles="color:blue">{this.state.reviewsRatingTotNum}</span></p>
                      </div>
                    </div>
                    </p>
                    <hr />
                    </div>

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
                    <hr />
                  </div>

                  <div className="w3-container">
                  <p>
                    <b>
                      <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue"></i>Favorite Beach: </b>
                    <span id="favBeaches">{this.state.favBeaches}</span>
                  </p>
                </div>
                </div>
                <hr />
              </div>


              <div className="w3-twothird">
                <div className="w3-container w3-card w3-light-gray w3-margin-bottom">
                  <h2 className="w3-text-grey w3-padding-16">
                    <i className="fa fa-clipboard fa-fw w3-margin-right w3-xxlarge text-dark-blue"></i>About Me</h2>
                  <span id="myBio">{this.state.bio}</span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default withAuth(Profile);