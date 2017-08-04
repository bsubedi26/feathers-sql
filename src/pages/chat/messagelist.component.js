import React, { Component } from 'react';

export default class MessageList extends Component {

  render() {
    return (
      <ul>
        {this.props.messages.map(message => {
          return <li key={message._id}>{message.userEmail}: {message.text} </li>
        })}
      </ul>
        
    )
  }
}
