import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import FindInstructorButton from "../find Instructor Button/FindInstructorButton"
import Nav from "../Nav"

class ViewProfile extends Component {

  state = {
    username: "",
    email: ""
  };

  componentDidMount() {
    API.getUser(this.props.match.params.id).then(res => {
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

export default withAuth(ViewProfile);