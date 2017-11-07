import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { PostList } from './components/posts';


import { authClient, restClient } from 'aor-feathers-client';
import feathersClient from './utilities/feathers';


const authClientOptions = {
  storageKey: 'feathers-jwt',
  authenticate: { strategy: 'local' },
};

// to rename id field for *all* resources use this syntax:
const options = { id: '_id' };

// to rename id field(s) for specific resources use this syntax:
// const options = {'my-resource': {id: '_id'}}


class App extends Component {
  render() {
    return (
    <Admin 
      /* restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')} */
      authClient={authClient(feathersClient, authClientOptions)}
      restClient={restClient(feathersClient, options)}
    >
        <Resource name="posts" list={PostList} />
    </Admin>
    );
  }
}

export default App;
