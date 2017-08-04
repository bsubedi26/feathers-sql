import React, { Component } from 'react';

export default class ErrorMessage extends Component {

  render() {
    return (
      <div>
        <span>{this.props.error.errorMessage}</span>
      </div>
    )
  }
}