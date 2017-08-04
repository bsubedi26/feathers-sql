import React, { Component } from 'react';
import './app.css';

import NavbarCmp from '../common/navbar.component';
import { Routes } from './app.routes';

class App extends Component {
  render() {
    return (
      <div>
        <NavbarCmp></NavbarCmp>
        <Routes />
      </div>
    );
  }
}

export default App;
