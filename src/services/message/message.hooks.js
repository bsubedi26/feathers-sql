'use strict';

const { authenticate } = require('@feathersjs/authentication').hooks;

const { populate } = require('feathers-hooks-common');
// const processMessage = require('../../hooks/process-message');


const delay = (time) => new Promise(resolve => setTimeout(resolve, time))
function debounce() {
  return async hook => {
    await delay(1000)
    return Promise.resolve(hook)
  }
}

function beforeFind() {
  return async (hook) => {
    const knex = hook.app.get('knexClient')
    // const user = await knex('users').where({ id: 39 })
    // const messagesJoined = await knex().from('messages')
    //   .innerJoin('users', 'users.id', 'messages.user_id')
    // console.log('MESSAGES -> ', messagesJoined)
    return hook
  }
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
    create: [],
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
