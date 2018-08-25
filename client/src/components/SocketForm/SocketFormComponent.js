import React, {Component} from 'react';
import {sockets} from '../../utils/Sockets';
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
      this.setState({messages: messages})
    });
    console.log(props)
    sockets.join(props.instructor || localStorage.getItem('user'))
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const {name, value} = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  submitForm = event => {
    event.preventDefault();
    console.log(this.props);
    sockets.sendMessage({
        text:this.state.message,
        to: this.props.instructor || localStorage.getItem('user')
    });
    this.setState({message: ""});
  };

  render() {
    return (
      <div>
        <p>Received Messages:</p>
        <ul className="message-container">
          {this.state.messages.map(message => <li className={(message.from === "instructor")} key={message}>{message}</li>)}
        </ul>
        <form className="form-inline">
          <div className="form-group">
            <input
              value={this.state.message}
              name="message"
              onChange={this.handleInputChange}
              type="text"
              placeholder="your message"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
        </form>
      </div>
    );
  }
}

export default SocketForm;