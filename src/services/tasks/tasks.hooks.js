

module.exports = {
  before: {
    all: [],
    find: [ beforeFindTask() ],
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
    console.log(hook.params.headers)
    let token = hook.params.headers.authorization.split(" ")
    console.log(token[1].toString())
    let result = await hook.app.passport.verifyJWT(token[1], { secret: hook.app.passport.options('jwt').secret })
    console.log('result ', result)
    return hook
  }
}


//  function beforeGetTask() {
//   return async (hook) => {
//   console.log('gg')
//   // let result = await app.passport.verifyJWT(hook.result.accessToken, { secret: app.passport.options('jwt').secret })
//   //   await hook.app.service('users').remove(result.userId)
//     return hook
//   };
// }