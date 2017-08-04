import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import services from '../../store/configureServices';
import { FeatherService } from '../../services/feather.service';
import UserList from './userlist.component';
import MessageList from './messagelist.component';

class ChatPage extends Component {
  constructor(props) {
    super(props)
    this.fService = new FeatherService;
    this.userService = this.fService.service('users');
    this.messageService = this.fService.service('messages');

    this.state = {
      email: '',
      password: '',
      error: {},
      allUsers: [],
      allMessages: [],
    }

  }

  componentDidMount() {
    this.userService.find()
    .then(users => this.setState({ allUsers: users }))
    .catch(error => console.log(error))

    this.messageService.find()
    .then(messages => this.setState({ allMessages: messages }))
    .catch(error => console.log(error))
  }

  handleOnChange(name, event) {
    this.setState({
      [name]: event.target.value
    })
 }
  handleBtnClick() {
    console.log(this.state)
  }
  render() {
    return (
      <div className="App">
        <div className="jumbotron">
          <h3>Chat Below</h3>
        </div>


        <div className="row">
          <div className="col-4">
            <UserList users={this.state.allUsers} />
          </div>
          <div className="col-8">
            <MessageList messages={this.state.allMessages} />
          </div>
        </div>
        
        <Form className="contain">
          
            <FormGroup className="padding-10">
              <Label for="email">Message:</Label>
              <Input onChange={ev => this.handleOnChange('message', ev)} type="text" name="message" placeholder="Message" />
            </FormGroup>
            <Button color="warning" onClick={this.handleBtnClick.bind(this)}>Submit</Button>
        
          </Form>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ChatPage);
