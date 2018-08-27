import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
import axios from "axios";

// Our Components
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup/Signup';
import goAvailable from "./components/goAvailable/goAvailable"
import ViewProfile from "./components/ViewProfile/ViewProfile"
import Splash from './components/Splash';
import Videos from './components/Videos';
import ProfileEdit from './components/ProfileEdit';
import Report from './components/Report';
import FindInstructorPage from './components/FindInstructorPage/FindInstructorPage'

if(localStorage.getItem("id_token")) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}
ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path= "/viewprofile/:id" component={ViewProfile}/>
                <Route exact path="/home" component={App} />
                <Route exact path="/" component={Splash} />
                <Route exact path="/splash" component={Splash} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/goAvailable" component={goAvailable} />
                <Route exact path="/videos" component={Videos} />
                <Route exact path="/editprofile" component={ProfileEdit} />
                <Route exact path="/report" component={Report} />
                <Route path="/findInstructor" component={FindInstructorPage} />
            </Switch>
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();