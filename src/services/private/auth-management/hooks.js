const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const _ = require('lodash');
const errors = require('feathers-errors');


const isEnabled = (options = {}) => {
  return function (hook) {

    if (!hook.params.provider) { return Promise.resolve(hook); }

    if (_.get(hook, 'params.user.role') === 'admin') { return Promise.resolve(hook); }

    if (!_.get(hook, 'params.user') || _.isEmpty(hook.params.user)) {

      throw new errors.NotAuthenticated(`Cannot check if the user is enabled. You must not be authenticated.`);

    } else if (!_.get(hook, 'params.user.isEnabled')) {

      var name = _.get(hook, 'params.user.name') || _.get(hook, 'params.user.email') || 'This user';

      throw new errors.Forbidden(`${name} is disabled.`);
    }
  }

}


const isAction = () => {
  let args = Array.from(arguments)
  return hook => args.includes(hook.data.action);
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      commonHooks.iff(
        isAction('passwordChange', 'identityChange'),
        [
          authenticate('jwt'),
          isEnabled()
        ]
      ),
    ],
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