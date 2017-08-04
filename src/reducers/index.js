import { combineReducers } from 'redux';
import images from './image.reducer';
import todos from './todos.reducer';
import services from '../store/configureServices';
import users from './user.reducer';

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  // images, 
  // todos,
  users,

  // feathers reducers
  // users: services.users.reducer,
  // messages: services.messages.reducer,
  // todos: services.todos.reducer,
});

export default rootReducer;