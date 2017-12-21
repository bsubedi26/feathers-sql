// const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;

const validateUniqueUser = require('./hooks/validateUniqueUser');
const sendVerificationEmail = require('./hooks/sendVerificationEmail');

// const { iffElse } = require('feathers-hooks-common');
// iffElse(predicate, hookFuncsTrue, hookFuncsFalse)

const oAuthCheck = () => {
  return async hook => {

    const svc = hook.app.service('oauth');
    const all = await svc.find();
    console.log('ALL ', all);

    const one = await svc.get(1);
    console.log('onE! ', one);

    return hook;
  };
};

module.exports = {
  before: {
    all: [],
    find: [
      // authenticate('jwt')
    ],
    get: [],
    create: [
      // oAuthCheck(),
      validateUniqueUser(),
      // verifyHooks.addVerification(),
      hashPassword()
    ],
    update: [ 
      hashPassword()
    ],
    patch: [
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
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
