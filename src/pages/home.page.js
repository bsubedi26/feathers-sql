import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../assets/logo.svg';
import { Button } from 'reactstrap';

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    console.log("Buttons props ", props)
  }
  render() {
    return (
      <div className="button-basics-example">
        <Button onClick={this.props.onClick} color="success">Submit</Button>
      </div>
    )
  }
}


class Home extends Component {
  componentDidMount() {
    console.log('home', this)
    // this.props.dispatch({type:'USER_LOGIN', payload: {s:'s'}})
  }

  handleBtnClick(d) {
    console.log('handle ')
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Buttons onClick={this.handleBtnClick.bind(this)}></Buttons>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(Home);
