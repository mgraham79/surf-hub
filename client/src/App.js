import React, { Component } from 'react';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import FindInstructorButton from "./components/findInstructorButton/FindInstructorButton";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import goAvailable from "./components/goAvailable/goAvailable"
import FindInstructorPage from "./components/FindInstructorPage/FindInstructorPage"
import API from "./utils/API"
import Nav from "./components/Nav"
import SocketFormComponent from './components/SocketForm/SocketFormComponent';

const axios = require("axios")
const Auth = new AuthService();

class App extends Component {

  // componentDidMount() {
  //   API.updateFieldBeach("5b7aef7d01ca7ef0dc408175", {"beachloc":{
  //     "lat": 55,
  //     "lng": 555
  // }})
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // }
  state = {
    userId: this.props.user.id,
    profileLink: "",
    User: "JohnDoe",
    latitude: 0,
    longitude: 0,
    beaches: [],
    sessionAvailable: false,
    availableSessionData: {},
    instructor: this.props.isInstructor
  };




  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      console.log(this.state)
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    const profileLinkURL = `/profile/${this.state.userId}`;
    this.setState({
      profileLink: profileLinkURL
    })

    // Storing the user id in local storage
    localStorage.setItem("user", this.props.user.id);

    //localStorage.setItem("user", "5b7cf350ce82af16010bcd41");
    console.log("here")
    API.getUser(this.props.user.id)
      .then(result => {
        this.setState({ instructor: result.data.instructor })
        if (result.data.instructor) {
          console.log(this.props.user.id)
          API.getOpenSessionByInstructorID(this.props.user.id)
            .then(res => {
              if (res.data) {
                this.setState({ sessionAvailable: true })
                this.setState({ availableSessionData: res.data })
              }
              console.log(this.state)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  showPosition = (position) => {
    console.log("Latitude: " + position.coords.latitude +
      " Longitude: " + position.coords.longitude);
    this.setState({ latitude: position.coords.latitude })
    this.setState({ longitude: position.coords.longitude })
  }

  setStateLocation = (latitude, longitude) => {
    this.setState({ latitude: latitude })
    this.setState({ longitude: longitude })
    console.log(latitude)
    console.log(this.state)
  }

  handleStartSession = () => {
    API.updateFieldSession(this.state.availableSessionData._id, { sessionStart: Date.now() })
      .then(result => {
        this.setState({ availableSessionData: result.data })
      })
      .catch(err => (console.log(err)))
  }

  handleEndSession = () => {
    var updateData= {
      sessionEnd: Date.now(),
      ended: "true"
    }
    API.updateFieldSession(this.state.availableSessionData._id, updateData)
      .then(result => {
        alert(`Ended session with ClientID ${result.data.clientID} 
      time from ${result.data.sessionStart}
      to ${result.data.sessionEnd}
      Don't forget to Go Available to Continue Teaching!`)
        this.setState({
          sessionAvailable: false,
          availableSessionData: {}
        })
      })
  }


  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace(this.state.profileLink);
  };

  render() {
    var conditionalSession
    var conditionalChat;
    <div className="jumbotron" id="jumbo-messages">
      if (this.props.isInstructor) {
        conditionalChat = <SocketFormComponent />
      }
    </div>

    if(this.props.isInstructor){
    if (this.state.sessionAvailable && this.state.availableSessionData.sessionStart && !this.state.availableSessionData.sessionEnd) {
      // if (this.state.availableSessionData.sessionStart && !this.state.availableSessionData.sessionEnd){
      conditionalSession = <div className="container"><button type="button" onClick={this.handleEndSession} className="btn-primary btn-danger">End Session With ClientID {this.state.availableSessionData.clientID}</button></div>
      //break
    }
    else if (this.state.sessionAvailable) {
      conditionalSession = <div className="container"><button type="button" onClick={this.handleStartSession} className="btn-primary btn-success">Start Session With ClientID {this.state.availableSessionData.clientID}</button></div>
    }
    else {
      conditionalSession = <div disabled className="container"><button type="button" className="btn-primary btn-secondary">Refresh Page To Start Session When Request Is Made In Chat</button></div>
    }
  }
if(!this.state.instructor){
      var videoEmbed=<div className="container"><iframe width="560" style={{marginTop:"50px"}} height="315" src="https://www.youtube.com/embed/--tz9JxNxss" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
    }
    return (
      <div>
        <Nav />
        {this.state.instructor ? <div></div> :<FindInstructorButton />}
        {conditionalSession}
        {videoEmbed}
        <br />
        <br />
        <br />
        {conditionalChat}
      </div>
    );
  }
}

export default withAuth(App);