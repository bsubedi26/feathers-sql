import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import feathers from '../store/configureFeathers';
import { connect } from 'react-redux';
import services from '../../store/configureServices';
import { FeatherService } from '../../services/feather.service';

import ErrorMessage from './form-error-message';


// <li className="alert alert-error" *ngfor="let m of messages">{'{'}{'{'}m{'}'}{'}'}</li>
// <div *ngif="!loginForm.controls['email'].valid && loginForm.controls['email'].touched">
//                 <span *ngif="loginForm.controls['email'].hasError('required')" className="alert-error">This field is required!</span>
//                 <span *ngif="loginForm.controls['email'].hasError('minlength')" className="alert-error">Please enter a value longer than 6 characters!</span>
//               </div>
// <fieldset>
//                 <input className="block" type="password" formcontrolname="password" placeholder="Password" />
//               </fieldset>
//               <div *ngif="!loginForm.controls['password'].valid && loginForm.controls['password'].touched">
//                 <span *ngif="loginForm.controls['password'].hasError('required')" className="alert-error">This field is required!</span>
//                 <span *ngif="loginForm.controls['password'].hasError('minlength')" className="alert-error">Please enter a value longer than 6 characters!</span>
//               </div>

class LPage extends Component {
  render() {
    return (

      <main className="login container">
        <div className="row">
          <div className="col-12 col-6-tablet push-3-tablet text-center heading">
            <h1 className="font-100">Account Login</h1>
            <ul className="no-list-decoration">
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
            <form>
              <fieldset>
                <input className="block" formcontrolname="email" placeholder="Email" />
              </fieldset>
              
              
              <span>Don't have an Account? <a className="text-primary">Sign up!</a></span>
              <button type="submit" id="login" className="button button-primary block signup">Submit</button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}


class Login extends Component {
  constructor(props) {
    super(props)
    this.fService = new FeatherService;
    this.userService = this.fService.service('users');

    this.state = {
      email: '',
      password: '',
      error: {}
    }

  }
  handleBtnClick(d) {
    console.log(this.state)
    const { email, password } = this.state

    const payload = {
      strategy: 'local',
      email,
      password
    };

    // this.props.dispatch({type:'USER_LOGIN', payload: payload})
    // this.props.dispatch(services.users.create({email, password}))
    // this.props.dispatch(services.todos.find())

    this.fService.authenticate(payload)
    .then(payload => {
      console.log(payload)
      this.props.history.push('/')
      this.props.dispatch({ type: 'USER_LOGIN_SUCCESS', payload: payload })
    })
    .catch(payload => {
      console.log(payload)
      this.setState({error: payload})
      this.props.dispatch({ type: 'USER_LOGIN_ERROR', payload: payload })
    })
    // feathers.authenticate(payload)
    // .then(data => this.props.history.push('/'))
    // .catch(error => this.setState({ error: error }))
  }
  handleOnChange(name, event) {
    this.setState({
      [name]: event.target.value
    })
  }
  render() {
    return (
      <div className="App">
      <LPage></LPage>
        
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(Login);
