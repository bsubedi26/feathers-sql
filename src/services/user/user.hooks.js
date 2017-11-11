// const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const validateUniqueUser = require('./_hooks/validateUniqueUser');

const delay = (time) => new Promise(resolve => setTimeout(resolve, time))
function debounce() {
  return async hook => {
    await delay(2000)
    return Promise.resolve(hook)
  }
}
module.exports = {
  before: {
    all: [],
    find: [
      debounce()
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
