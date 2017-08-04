import React, { Component } from 'react';

export default class UserList extends Component {

  render() {
    return (
      <div>
        <span>There are {this.props.users.length} users.</span>
        <ul>
          {this.props.users.map(user => {
            return <li key={user._id}>{user.email}</li>
          })}
        </ul>
      </div>
        
    )
  }
}
