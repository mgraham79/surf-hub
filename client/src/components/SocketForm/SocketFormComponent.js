import React, { Component } from 'react';
import { sockets } from '../../utils/Sockets';
import './SocketForm.css';

class SocketForm extends Component {
  state = {
    message: '',
    sentMessage: '',
    messages: []
  };

  componentWillUnmount() {
    sockets.disconnect()
  }

  constructor(props) {
    super(props);
    sockets.listenForMessage(data => {
      let messages = [...this.state.messages, data];
      this.setState({ messages: messages })
    });
    console.log(props)
    sockets.join(props.instructor || localStorage.getItem('user'))
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  submitForm = event => {
    event.preventDefault();
    console.log(this.props);
    sockets.sendMessage({
      from: window.location.pathname.startsWith("/v") ? "client" : 'instructor',
      text: this.state.message,
      to: this.props.instructor || localStorage.getItem('user')
    });
    this.setState({ message: "" });
  };

  render() {
    return (
      <section className="module">
        <header className="top-bar">
          <h1>Messages:</h1>
        </header>
        <ul className="conversation">
          {this.state.messages.map(message =>
            <li className={(message.from === 'client' ? `client` : `instructor`)} key={message.text}>
              <div className="avatar">
                <img src={(message.from === `client` ? "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR1IUKek7WvFiEbnJ9AuWyZTI5TYmaGC5e7KV8LIz-I2xV8wHj5Q")} alt="avatar" />

              </div>
              <div className="messages">
                <p>{message.text}</p>
              </div>
            </li>

          )}
        </ul>
        <form className="form-inline">
          <div className="form-group">
            <input
              value={this.state.message}
              name="message"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Type messages here"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn-primary" onClick={this.submitForm}>Submit</button>
        </form>
      </section>
    );
  }
}

export default SocketForm;