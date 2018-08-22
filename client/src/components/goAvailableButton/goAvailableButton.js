import React, { Component } from "react"
import "./goAvailableButton.css";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
//this will be the button and beach container

class goAvailableButtonButton extends Component {



    render() {
        return <div className="container">
            <button className="btn-danger">I'm available to teach, Bruh!</button>
            
        </div>

    }
}
export default goAvailableButtonButton 