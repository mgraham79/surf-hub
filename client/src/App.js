import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FindInstructorButton from "./components/find Instructor Button/FindInstructorButton";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import FindInstructorPage from "./components/Find Instructor Page/FindInstructorPage"
import API from "./utils/API"
const axios = require("axios")

class App extends Component {
  state = {
    User: "JohnDoe",
    latitude: 0,
    longitude: 0,
    beaches: []

  }

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      console.log(this.state)
    } else {
      console.log("Geolocation is not supported by this browser.");
      console.log(this.state)
    }
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




  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to="/findInstructor"><FindInstructorButton onClick={this.getBeaches}/>
            </Link>
            <Switch>
              <Route path="/findInstructor" component={FindInstructorPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
