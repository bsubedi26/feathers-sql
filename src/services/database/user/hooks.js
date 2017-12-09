// const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const commonHooks = require('feathers-hooks-common');

const accountService = require('../../private/auth-management/notifier');
const validateUniqueUser = require('./hooks/validateUniqueUser');
// const sendVerificationEmail = require('./hooks/sendVerificationEmail');


module.exports = {
  before: {
    all: [],
    find: [
      // debounce()
      // authenticate('jwt')
    ],
    get: [],
    create: [
      // verifyHooks.addVerification(),
      // fixAddVerification(),
      validateUniqueUser(),
      hashPassword() 
    ],
    update: [ 
      // commonHooks.disallow('external'),
      hashPassword()
    ],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider('external'),    
        commonHooks.preventChanges(
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
      )),
      hashPassword()
    ],
    remove: []
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // MUST BE THE LAST HOOK
      protect('password')
    ],
    find: [
    
    ],
    get: [],
    create: [
      // sendVerificationEmail(),
      // removes verification/reset fields other than .isVerified
      // verifyHooks.removeVerification()
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ 
      // catchAllErrors()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
