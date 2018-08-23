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
    beaches: []
  };

  


  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      console.log(this.state)
    } else {
      console.log("Geolocation is not supported by this browser.");
      console.log(this.state)
    }
    const profileLinkURL = `/profile/${this.state.userId}`;
    this.setState({
      profileLink: profileLinkURL})

      // Storing the user id in local storage
      localStorage.setItem("user", this.props.user.id);

      console.log(this.props.user.id)
      //localStorage.setItem("user", "5b7cf350ce82af16010bcd41");
      console.log(localStorage.getItem("user"));
  }

  showPosition = (position) => {
    console.log("Latitude: " + position.coords.latitude +
      " Longitude: " + position.coords.longitude);
    this.setState({ latitude: position.coords.latitude })
    this.setState({ longitude: position.coords.longitude })
    console.log(this.state)
  }

  setStateLocation = (latitude, longitude) => {
    this.setState({ latitude: latitude })
    this.setState({ longitude: longitude })
    console.log(latitude)
    console.log(this.state)
  }


  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace(this.state.profileLink);
  };

  render() {
    console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      <div>
        <Nav/>
           <FindInstructorButton/>
      </div>
    );
  }
}

export default withAuth(App);