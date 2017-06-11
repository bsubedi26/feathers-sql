const { authenticate } = require('feathers-authentication').hooks;
const { hashPassword } = require('feathers-authentication-local').hooks;
const commonHooks = require('feathers-hooks-common');
const privateHooks = require('./_hooks/index');
const errors = require('feathers-errors');

const restrict = [];

module.exports = {
  before: {
    all: [],
    find: [],
    get: [...restrict],
    create: [
      beforeCreateUser(),
      hashPassword()
    ],
    update: [...restrict, hashPassword()],
    patch: [...restrict, hashPassword()],
    remove: [...restrict]
  },

  after: {
    all: [
      commonHooks.when(hook => hook.params.provider, commonHooks.discard('password'))
      // commonHooks.discard('password')
    ],
    find: [],
    get: [],
    create: [afterCreateUser()],
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


function beforeCreateUser() {
  return async (hook) => {
    console.log('::beforeCreateUser() ', hook.data)
    const { password } = hook.data
    return hook
  }
}

function afterCreateUser() {
  return async (hook) => {
    console.log('::afterCreateUser() ', hook.data)
    return hook
  }
}
