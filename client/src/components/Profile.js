import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import Nav from "./Nav"
import FindInstructorButton from "./findInstructorButton/FindInstructorButton"

class Profile extends Component {

  state = {
    username: "",
    email: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }

  render() {
    console.log(this.props)
    return (
      <div>
      <Nav/>
      <div className="container Profile">
        <FindInstructorButton/>
        <h1>On the profile page!</h1>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <Link to="/home">Go home</Link>
      </div>
      </div>
    )
  }
}

export default withAuth(Profile);