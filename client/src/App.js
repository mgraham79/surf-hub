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
import SocketFormInstructor from './components/SocketForm/SocketFormInstructor';
import Moment from 'react-moment';
import 'moment-timezone';

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
    location: "",
    latitude: 0,
    longitude: 0,
    beaches: [],
    sessionAvailable: false,
    availableSessionData: {},
    closedSessionInstr: [],
    closedSessionClient: [],
    instructor: this.props.isInstructor,
    available:"",
    instructorName: "",
    instructorFirstName: "",
    instructorMiddleInitial: "",
    instructorLastName: "",
    clientName: "",
    clientFirstName: "",
    clientMiddleInitial: "",
    clientLastName: "",
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
        this.setState({
          instructor: result.data.instructor,
          location: result.data.location,
          available: result.data.available,
          User: result.data.firstName,
          instructorFirstName: result.data.firstName,
          instructorMiddleInitial: result.data.middleInitial,
          instructorLastName: result.data.lastName
        })
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

            // Getting Session Data based on Instructor of a closed session
            API.getClosedSessionByInstructorID(this.props.user.id)
            .then(res => {
              if (res.data) {
                this.setState({ closedSessionInstr: res.data })
              }
              console.log("closedSessionInstr: " + this.state.closedSessionInstr)
            })
            .catch(err => console.log(err))

        } else {
           // Getting Session Data based on Client of a closed session
           API.getClosedSessionByClientID(this.props.user.id)
           .then(res => {
             if (res.data) {
               this.setState({ closedSessionClient: res.data })
             }
             console.log("closedSessionClient: " + this.state.closedSessionClient)
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
      API.updateFieldUser(this.props.user.id, {available: "false"})
      .then(result=> {this.setState({available:result.data.available})})
      .catch(err => {(console.log(err))})
  }

  handleEndSession = () => {
    
    // Client's name information
    API.getUser(this.state.availableSessionData.clientID)
      .then(res => {
        this.setState({
          clientFirstName: res.data.firstName,
          clientMiddleInitial: res.data.middleInitial,
          clientLastName: res.data.lastName
        })
        console.log(this.state)
    });

     // The setTimeout is needed for clientNames to be defined
     setTimeout(function() {
      clientNameDelay();
    }, 1000);
    var clientNameDelay = () => {
    
    
        // Client's full name
        // Checking for null value of middle initial
        var clientFullName
        if(!this.state.clientMiddleInitial) {
          clientFullName = this.state.clientFirstName + " " + this.state.clientMiddleInitial + this.state.clientLastName
        }
        else {
          clientFullName = this.state.clientFirstName + " " + this.state.clientMiddleInitial + " " + this.state.clientLastName
        }
        this.setState({clientName: clientFullName})
        
        // Instructor's full name
        // Checking for null value of middle initial
        var instructorFullName
        if(!this.state.instructorMiddleInitial) {
          instructorFullName = this.state.instructorFirstName + " " + this.state.instructorMiddleInitial + this.state.instructorLastName
        }
        else {
          instructorFullName = this.state.instructorFirstName + " " + this.state.instructorMiddleInitial + " " + this.state.instructorLastName
        }
        this.setState({instructorName: instructorFullName})


    var updateData = {
      sessionEnd: Date.now(),
      ended: "true",
      sessionLoc: this.state.location.replace(/ /g, "_"),
      clientName: this.state.clientName.replace(/ /g, "_"),
      instructorName: this.state.instructorName.replace(/ /g, "_")
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
      // Save Session Id to local storage
      localStorage.setItem("sessionIdLocStor", this.state.availableSessionData._id);

      // Send the user to the review page
      this.props.history.replace('/review');
    }  // End of SetTimeout
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
    
      if (this.props.isInstructor) {
        conditionalChat = <SocketFormInstructor />
      }
  

    if (this.props.isInstructor) {
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
    if (!this.state.instructor) {
      var videoEmbed = <div className="container"><iframe width="560" style={{ marginTop: "50px" }} height="315" src="https://www.youtube.com/embed/--tz9JxNxss" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
    }

    if(this.props.isInstructor){
    var instructorInfo= <div><h1>S'up {this.state.User}</h1><hr/>
    <ul style={{listStyle:"none"}}>
      <li><b>Your visible location is:</b><br/> {this.state.location.replace(/_/g," ")}</li>
      <li><b>Availability:</b> <br/>{this.state.available.toString()}</li>
      <li></li>
    </ul>
    </div>
    }

    if(this.props.isInstructor){
      var instructorSessions=  <div className="row">
      <div id="instructTable" className="col col-lg-12">
        {this.state.closedSessionInstr.map(isession => (
          <div key={isession._id} className="row">
            <div>
              <table class="table">
                <tbody>
                  <tr>
                    <th>
                    Client ID
                    </th>
                    <th>
                    Client Name
                    </th>
                    <th>
                    Session Start
                    </th>
                    <th>
                    Session End
                    </th>
                    <th>
                    Session Duration
                    </th>
                    <th>
                    Location
                    </th>
                  </tr>
                  <tr>
                    <td align="center">
                      Client ID: <br />
                      {isession.clientID}
                    </td>
                    <td align="center">
                      Client Name: <br />
                      {isession.clientName.replace(/_/g," ")}
                    </td>
                    <td align="center">
                      Session Start: <br />
                      {isession.sessionStart}
                    </td>
                    <td align="center">
                      Session End: <br />
                      {isession.sessionEnd}
                    </td>
                    <td align="center">
                      Session Duration: <br />
                      {isession.sessionEnd}
                    </td>
                    <td align="center">
                      Location: <br />
                      {isession.sessionLoc.replace(/_/g," ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      </div>
      
      }




    return (
      <div>
        <Nav />
        {this.state.instructor ? <div></div> : <FindInstructorButton />}
        {conditionalSession}
        {videoEmbed}
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-6" style={{backgroundColor: "lightgray", opacity: ".8"}}>
              {instructorInfo}
            </div>
            <div className="col-md-1">
            </div>
            <div className="col-md-5">
              {conditionalChat}
            </div>
          </div>
          {instructorSessions}
        </div>
        


      </div>
    );
  }
}

export default withAuth(App);