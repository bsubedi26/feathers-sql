// const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const validateUniqueUser = require('./_hooks/validateUniqueUser');

module.exports = {
  before: {
    all: [],
    find: [ 
      // authenticate('jwt')
    ],
    get: [],
    create: [ hashPassword() ],
    update: [ hashPassword() ],
    patch: [ hashPassword() ],
    remove: []
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // MUST BE THE LAST HOOK
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [
      validateUniqueUser()
    ],
    update: [],
    patch: [],
    remove: []
  }
};
