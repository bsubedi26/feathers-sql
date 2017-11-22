const createBefore = () => {
  return async hook => {
    // console.log(Object.keys(hook))
    // console.log(hook.path)
    return hook;
  };
};
const createError = () => {
  return async hook => {
    // console.log(Object.keys(hook))
    // console.log(hook.original)
    // console.log("********************************")
    // console.log("********************************")
    // console.log(hook.params)
    // console.log("********************************")
    // console.log("********************************")
    // console.log(hook.error)
    return hook;
  };
};
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createBefore()],
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
    create: [createError()],
    update: [],
    patch: [],
    remove: []
  }
};
