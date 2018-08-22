import React, { Component } from 'react';
import AuthService from './AuthService';

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
                    this.setState({
                        user: profile
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
                    <AuthComponent match={this.props.match} history={this.props.history} user={this.state.user} />
                );
            }
            else {
                return null;
            }
        }
    };
}