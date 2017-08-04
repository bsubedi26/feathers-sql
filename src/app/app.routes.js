import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home.page';
import Login from '../pages/login/login.page';
import Signup from '../pages/signup.page';
import Chat from '../pages/chat/chat.page';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/chat' component={Chat}/>
    </Switch>
  )
}
