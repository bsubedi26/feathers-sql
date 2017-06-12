const authentication = require('feathers-authentication');


module.exports = {
  before: {
    all: [],
    find: [ 
      beforeFindTask(),
      authentication.hooks.authenticate('jwt')
    ],
    get: [],
    create: [ beforeCreateTask() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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

function beforeCreateTask() {
  return async function(hook) {
    console.log('::beforeCreateTask() ', hook.data)
    return hook
  }
}

function beforeFindTask() {
  return async function(hook) {
    console.log('::beforeFindTask()')
    // console.log(hook.params.headers)
    let result = await hook.app.passport.verifyJWT(hook.params.headers.authorization, { secret: hook.app.passport.options('jwt').secret })
    console.log('app.passport.verifyJWT() result ', result)
    return hook
  }
}