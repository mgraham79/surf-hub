import React, { Component } from 'react';
import AuthService from './AuthService';
import API from "../utils/API"

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            };
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/splash');
            }
            else {
                try {
                    const profile = Auth.getProfile();
                    API.getUser(profile.id).then(result=>{
                        this.setState({instructor: result.data.instructor})
                    })
                    this.setState({
                        user: profile,
                    });
                }
                catch(err){
                    Auth.logout();
                    this.props.history.replace('/splash');
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent match={this.props.match} history={this.props.history} user={this.state.user} isInstructor={this.state.instructor} />
                );
            }
            else {
                return null;
            }
        }
    };
}