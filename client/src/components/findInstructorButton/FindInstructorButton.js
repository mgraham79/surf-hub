import React, { Component } from "react"
import "./FindInstructorButton.css";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
//this will be the button and beach container

class FindInstructorButton extends Component {



    render() {
        return <Link to="/FindInstructor"><div className="container" style={{marginTop: "20px"}}>
            <button className="btn-danger">Find an Instructor, Bruh!</button>
            
        </div></Link>

    }
}
export default FindInstructorButton 