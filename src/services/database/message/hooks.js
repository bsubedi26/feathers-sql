// const { authenticate } = require('@feathersjs/authentication').hooks;
// const { populate } = require('feathers-hooks-common');
// const processMessage = require('../../hooks/process-message');


const delay = (time) => new Promise(resolve => setTimeout(resolve, time));
function debounce() {
  return async hook => {
    await delay(1000);
    return Promise.resolve(hook);
  };
}


function addUserEmailId() {
  return async hook => {
    const { user } = hook.params;
    
    hook.data = Object.assign({}, hook.data, {
      user_id: user.id,
      user_email: user.email
    });

    return hook;
  };
}
module.exports = {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [
      debounce()
    ],
    get: [],
    create: [
      addUserEmailId()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      // populate({
      //   schema: {
      //     include: [{
      //       service: 'users',
      //       nameAs: 'user',
      //       parentField: 'userId',
      //       childField: '_id'
      //     }]
      //   }
      // })
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
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
