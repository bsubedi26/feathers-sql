import reduxifyServices from 'feathers-redux';
import feathersClient from './configureFeathers';

// Create Redux actions and reducers for Feathers services
const configureServices = reduxifyServices(feathersClient, ['users', 'messages', 'todos']);

export default configureServices;