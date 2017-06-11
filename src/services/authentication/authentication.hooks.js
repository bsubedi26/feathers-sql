/***
  Feathers authentication uses the create method for login 
  and the remove method for logout.  
***/
const authentication = require('feathers-authentication');
const localAuthVerify = require('feathers-authentication-local').Verifier;
const privateHooks = require('./_hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // authentication.hooks.authenticate(["jwt", "local"])
      privateHooks.verifyUserCredentials()
    ],
    update: [],
    patch: [],
    remove: [
      authentication.hooks.authenticate('jwt')
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      // privateHooks.afterCreatingToken()
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
