// Application hooks that run for every service
const logger = require('./hooks/logger');
const { iff } = require('feathers-hooks-common');
const isSqlite = require('./hooks/isSqlite');
const stringifyJsonForSqlite = require('./hooks/stringifyJsonForSqlite');

module.exports = {
  before: {
    all: [
      logger(),
      iff((isSqlite()), stringifyJsonForSqlite())
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      logger(),
      // iff((isSqlite()), parseJSONForSqlite())
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ 
      logger()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
