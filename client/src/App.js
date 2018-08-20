import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FindInstructorButton from "./components/find Instructor Button/FindInstructorButton";


class App extends Component {
  state={
    User:"JohnDoe",
    latitude: 0,
    longitude: 0
    
  }

componentDidMount=()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
        console.log(this.state)
    } else { 
       console.log("Geolocation is not supported by this browser.");
    console.log(this.state)
      }
}

showPosition=(position)=>{
  console.log("Latitude: " + position.coords.latitude + 
  " Longitude: " + position.coords.longitude);
  this.setState({latitude: position.coords.latitude})
  this.setState({longitude: position.coords.longitude})
  console.log(this.state)
}

   setStateLocation=(latitude,longitude)=>{    
     this.setState({latitude: latitude})
     this.setState({longitude: longitude})    
     console.log(latitude)
     console.log(this.state)
   }

   handleFindingInstructor=(longitude, latitude)=>{
     
     
   }

  
  

  render() {
    return (
      <div>
        <FindInstructorButton onClick={()=> this.handleFindingInstructor}/>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
</div>
  );
  }
}

export default App;
