'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { hashPassword } = require('feathers-authentication-local').hooks;
const commonHooks  = require('feathers-hooks-common');
const gravatar = require('../../hooks/gravatar');

function beforeFindUser() {
  return hook => {
    // console.log('beforeFindUser::hook ', hook.params)
    // console.log('beforeFindUser::hook ', Object.keys(hook))

    return Promise.resolve(hook)
  }
}

module.exports = {
  before: {
    all: [],
    find: [ 
      authenticate('jwt'),
      beforeFindUser() 
    ],
    get: [ authenticate('jwt') ],
    create: [hashPassword(), gravatar()],
    update: [ authenticate('jwt') ],
    patch: [ authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
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
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
