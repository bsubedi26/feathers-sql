// const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
// const debounce = require('./hooks/debounce');
// const catchAllErrors = require('./hooks/catchAllErrors');
const verifyHooks = require('feathers-authentication-management').hooks;
const commonHooks = require('feathers-hooks-common');

const accountService = require('../../private/auth-management/notifier');

// AFTER USER IS CREATED SEND VERIFICATION EMAIL
const sendVerificationEmail = () => {
  return async hook => {
    if (!hook.params.provider) return hook;

    const user = hook.result;

    if (hook.data && hook.data.email && user) {
      accountService(hook.app).notifier('resendVerifySignup', user);
      return hook;
    }
    return hook;
  };
};

const fixAddVerification = () => {

  return async hook => {
    // console.log('FIX ME ', hook.data)
    // hook.data.verifyExpires = new Date();
    // console.log(hook.data.verifyChanges)
    // JSON.stringify(hook.data.verifyChanges);
    return hook;
  };
};

// const checkJSON = () => {
//   return async hook => {

//     const { data } = hook.result;
//     const obj = data.filter(item => item.id === 2)[0]
//     const parsed = JSON.parse(obj.verifyChanges)
//     console.log(parsed)
//     console.log(parsed.wo)
    

//     return hook;
//   }
// }
module.exports = {
  before: {
    all: [],
    find: [
      // debounce()
      // authenticate('jwt')
    ],
    get: [],
    create: [
      verifyHooks.addVerification(),
      fixAddVerification(),
      hashPassword() 
    ],
    update: [ 
      commonHooks.disallow('external'),
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
      sendVerificationEmail(),
      // removes verification/reset fields other than .isVerified
      verifyHooks.removeVerification()
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
