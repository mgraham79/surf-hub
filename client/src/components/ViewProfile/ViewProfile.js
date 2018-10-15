import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Nav from "../Nav"
import SocketFormComponent from "../SocketForm/SocketFormComponent"
import "./ViewProfile.css";
import { sockets } from "../../utils/Sockets"
import FindInstructorButton from "../findInstructorButton/FindInstructorButton"
import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";
import Moment from 'react-moment';
import 'moment-timezone';

class ViewProfile extends Component {

  state = {
    reviewCards: [],
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
    ratingsAll: [],
    reviewsAll: [],
    reviewersFirstNameAll: [],
    reviewersPictureAll: [],
    reviewsDateAll: [],
    reviewsRatingAve: 0,
    reviewsRatingAveInt: 0,
    reviewsRatingTotNum: 0
  };

  handleCreateLesson = () => {
    console.log("clicked create lesson")
    API.saveSession({ clientID: localStorage.getItem('user'), instructorID: this.props.match.params.id })
      .then(result => {
        this.setState({ sessionStarted: true })
        console.log(result.data._id)
      })
    sockets.sendMessage({
      text: `User Id ${localStorage.getItem('user')} created a session... Waiting for reply to start`,
      to: this.props.match.params.id
    })
    API.updateFieldUser(this.props.match.params.id, { reserved: true })
      .then(result => {
        this.setState({ instructorReserved: true })
      })
      .catch(err => console.log(err))
  }

  handleCreateReview = () => {
    // Send the user to the review page
    this.props.history.replace('/review');
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
        bio: res.data.bio,
        instructorReserved: res.data.reserved,
        ratingsAll: res.data.ratingsAll,
        reviewsAll:  res.data.reviewsAll,
        reviewersFirstNameAll:  res.data.reviewersFirstNameAll,
        reviewersPictureAll: res.data.reviewersPictureAll,
        reviewsDateAll: res.data.reviewsDateAll,
      })
    });
    

     // The setTimeout is needed for ratingsAll to be defined
     setTimeout(function() {
      ratingsDelay();
    }, 3000);
    var ratingsDelay = () => {
        // Checking if th array is empty
        if (this.state.ratingsAll.length === 0) {
          console.log("ratingsAll array empty")
          this.setState({
            reviewsRatingAve: 0,
            reviewsRatingAveInt: 0,
            reviewsRatingTotNum: 0
          });
        } else {
          // Set the ratingsAll array to a new name
          const newRatingsAll = this.state.ratingsAll
          // Calculate the total number of reviews
          const totNumRatings = this.state.ratingsAll.length;
          // Calculate the average of the ratings array
          const arrAvg = arr =>
          arr.reduce((a, b) => a + b, 0) / arr.length;

          const ratingAve = arrAvg(newRatingsAll)

          // Calculate the average of the ratings to the nearest integer
          const arrAvgInt = roundInt(ratingAve);
          function roundInt(num) {
            return Math.round(num * 1) / 1;
          }
          console.log("ratingAve: " + ratingAve)
          console.log("arrAvgInt: " + arrAvgInt)
          this.setState({
            reviewsRatingAve: arrAvg,
            reviewsRatingAveInt: arrAvgInt,
            reviewsRatingTotNum: totNumRatings
          });
        }

        // Creating review card constructor function

        var ReviewCard = function(cardRating, cardReview, cardDate, cardPic, cardFName) {
          this.cardRating = cardRating;
          this.cardReview = cardReview;
          this.cardDate = cardDate;
          this.cardPic = cardPic;
          this.cardFName = cardFName;
        }
          
        // creating an array review card objects
        const newReviewCards = this.state.reviewCards
        for (var k = 0; k < this.state.ratingsAll.length; k++) {
          newReviewCards[this.state.ratingsAll.length -1 - k] = new ReviewCard(this.state.ratingsAll[k],this.state.reviewsAll[k],this.state.reviewsDateAll[k], this.state.reviewersPictureAll[k], this.state.reviewersFirstNameAll[k])
        }

        this.setState({
          reviewCards: newReviewCards,
        });
     
    }
  }

  handleButtonChat = () => {
    if (!this.state.chatting) {
      this.setState({ chatting: true })
    }
    else {
      this.setState({ chatting: false })
    }
  }

  render() {
    console.log(this.state);
    if (!this.state.chatting) {
      var buttonChat = <button onClick={this.handleButtonChat} type="button" className="btn-primary">Start Chat</button>
    } else {
      var buttonChat = <button onClick={this.handleButtonChat} type="button" className="btn-primary">Close Chat</button>
    }

    if (!this.state.instructorReserved && this.state.chatting) {
      var buttonSession;
      if (!this.state.sessionStarted) {
        buttonSession = <button type="button" onClick={this.handleCreateLesson} className="btn-primary btn-success">Create Lesson With This Instructor</button>
      }
      else {
        buttonSession = <button type="button" className="btn-primary btn-danger">End Lesson With This Instructor</button>
      }
    }
    else {
      var buttonSession = <button type="button" onClick={this.handleCreateLesson} className="btn-primary btn-secondary" disabled>Create Lesson With This Instructor</button>
    }

    
    // Review Button Logic
    if (this.state.sessionStarted) {
      var buttonReview;
        buttonReview = <button type="button" onClick={this.handleCreateReview} className="btn-primary btn-success">Create A Review For This Instructor</button>
    }
    else {
      buttonReview = <button type="button" onClick={this.handleCreateReview} className="btn-primary btn-secondary" disabled>Create A Review For This Instructor</button>
    }



    const { reviewsRatingAveInt } = this.state;
    return (
      <div>
        <Nav />
        <div className="container Profile">
          {this.props.isInstructor ? <div></div> : <FindInstructorButton />}
          <div id="bg">
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
                    </div>
                    
                    <div className="w3-container">
                    <p>
                     
                    <div className="starsRating">
                    <b>Rating:</b>
                      <div styles={{ fontSize:50 }}>
                        <StarRatingComponent
                          name="rate2"
                          editing={false}
                          // did not work when using just renderStarIcon
                          renderStarIconHalf={() => <span></span>}
                          starCount={5}
                          value={reviewsRatingAveInt}
                        />
                        <p><b>Reviews:</b> <span styles="color:blue">{this.state.reviewsRatingTotNum}</span></p>
                      </div>
                    </div>
                    </p>
                    <hr />
                    </div>

                    <div className="w3-container">
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
                {buttonChat}
                {buttonSession}
                {buttonReview}
                <br />
                <br />
                <br />
                <div className="container" id="view-messages">
                  {(this.state.chatting === true) ? <SocketFormComponent instructor={this.props.match.params.id} /> : <div> </div>}
                </div>
              </div>

              <div className="w3-twothird">
                <div className="w3-container w3-card w3-light-gray w3-margin-bottom">
                  <h2 className="w3-text-grey w3-padding-16">
                    <i className="fa fa-clipboard fa-fw w3-margin-right w3-xxlarge text-dark-blue"></i>Reviews</h2>
                    
                    
                    {/* Start of Review Card Creation*/}
                    {this.state.reviewCards.map(reviewCard => (
                    <div className="w3-card-4">
                      <div header className="w3-container">
                      <div className="row">
                      <div className="col-sm-3 w3-center ">

                       <img className="w3-circle w3-margin-top" src={reviewCard.cardPic} alt="Avatar" />
                       <br />
                       <b>
                       <i className="w3-large text-dark-blue"></i>
                       {reviewCard.cardFName}
                       </b>
                       </div>
                       <div className="col-sm-9">
                    
                      <div className="starsRating1Review">
                      <div styles={{ fontSize:50 }}>
                        <StarRatingComponent
                          name="rate3"
                          editing={false}
                          // did not work when using just renderStarIcon
                          renderStarIconHalf={() => <span></span>}
                          starCount={5}
                          value={reviewCard.cardRating}
                        />
                        <span id="date-right">  <Moment  format="MMMM Do YYYY">
                        {reviewCard.cardDate}
                        </Moment></span>
                        <br />
                        <p>{reviewCard.cardReview}</p>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>

                    
                    </div>

                    ))} {/* End of Review Card Creation*/}

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

export default withAuth(ViewProfile);