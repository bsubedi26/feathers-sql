
function beforeCreate() {
  return function(hook) {
    console.log('USER ', hook.params.user)
    console.log('DATA ', hook.data)
    return Promise.resolve(hook)
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [beforeCreate()],
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
