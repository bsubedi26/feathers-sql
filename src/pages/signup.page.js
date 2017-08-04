import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import feathers from '../store/configureFeathers';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: {}
    }
  }

  handleBtnClick(d) {
    // const userService = feathers.service('users')
    // console.log(this.state)
    const { email, password } = this.state
    const payload = { email, password }
    this.props.dispatch({ type: 'USER_CREATE', payload: payload })

    // userService.create({
    //   email,
    //   password
    // })
    // .then(data => this.props.history.push('/login'))
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
        <div className="jumbotron">
          <h3>Signup Below</h3>
        </div>
        <Form className="contain" inline>
          <FormGroup className="padding-10">
            <Label for="email">Email:</Label>
            <Input onChange={ev => this.handleOnChange('email', ev)} type="email" name="email" placeholder="email@google.com" />
          </FormGroup>

          <FormGroup className="padding-10">
            <Label for="password">Password:</Label>
            <Input onChange={ev => this.handleOnChange('password', ev)} type="password" name="password" placeholder="Password" />
          </FormGroup>
          <Button color="success" onClick={this.handleBtnClick.bind(this)}>Submit</Button>
        </Form>

        { this.state.error && this.state.error.message ? 
          (<p className="text-danger">{this.state.error.message}</p>) : null }
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(Signup);
