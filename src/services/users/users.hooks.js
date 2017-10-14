'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { hashPassword } = require('feathers-authentication-local').hooks;
const commonHooks  = require('feathers-hooks-common');
const gravatar = require('../../hooks/gravatar');
const { validateUniqueUser } = require('./hooks');

module.exports = {
  before: {
    all: [],
    find: [  ],
    get: [  ],
    create: [
      validateUniqueUser(),
      hashPassword()
    ],
    update: [ authenticate('jwt') ],
    patch: [ authenticate('jwt') ],
    remove: [ 
      // authenticate('jwt')
    ]
  },

  after: {
    all: [commonHooks.when(hook => hook.params.provider, commonHooks.discard('password'))],
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

    ],
    update: [],
    patch: [],
    remove: []
  }
};
