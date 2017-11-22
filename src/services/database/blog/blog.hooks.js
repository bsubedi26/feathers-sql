// const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
const { hooks } = require('feathers-knex');
const { transaction } = hooks;

function trxTest() {
  return async (hook) => {
    // const knex = hook.app.get('knexClient');
    // hook.service.Model is knex
    // console.log(hook.service.Model === knex) : true
    // const { transaction } = hook.params
    // await hook.app.service('messages').create({ text: 'Boom' }, { transaction })
    // await hook.app.service('users').create({ email: 'abcd', password: 'bbbbb' }, { transaction } )
    // const res = await knex('users').where('email', 'like', '%ab%')
    return hook;
  };
}

module.exports = {
  before: {
    all: [
      transaction.start()
    ],
    find: [

    ],
    get: [],
    create: [
      trxTest()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      transaction.end()
    ],
    find: [
      populate({
        schema: {
          include: [{
            service: 'comment',
            nameAs: 'comment',
            parentField: 'id',
            childField: 'blog_id'
          }]
        }
      })
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      transaction.rollback()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
