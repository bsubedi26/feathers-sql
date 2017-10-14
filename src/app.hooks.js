// Application hooks that run for every service
const logger = require('./hooks/logger');
const { sqliteErrorHandler, displayResponse } = require('./hooks/sqlite');

module.exports = {
  before: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [ 
      // displayResponse() 
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      logger(),
      // sqliteErrorHandler()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
