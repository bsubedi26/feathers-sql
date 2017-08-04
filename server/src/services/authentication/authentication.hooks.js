const authentication = require('feathers-authentication');
const afterCreateToken = require('../../hooks/authentication/after-create-token');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authentication.hooks.authenticate([
        "jwt",
        "local"
      ]),
    ],
    update: [],
    patch: [],
    remove: [
      authentication.hooks.authenticate('jwt')
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      afterCreateToken()
    ],
    update: [],
    patch: [],
    remove: []
  },

}
