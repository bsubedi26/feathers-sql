const errors = require('feathers-errors');

const isEnabled = () => {
  return function (hook) {
    if (!hook.params.provider) { return Promise.resolve(hook); }
    // if (_.get(hook, 'params.user.role') === 'admin') { return Promise.resolve(hook); }
    // if (hook.params.user.role === 'admin') { return Promise.resolve(hook); }

    // if (!_.get(hook, 'params.user') || _.isEmpty(hook.params.user)) {
    if (!hook.params.user || Object.keys(hook.params.user).length < 1) {
      throw new errors.NotAuthenticated('Cannot check if the user is enabled. You must not be authenticated.');
    }
    // else if (!_.get(hook, 'params.user.isEnabled')) {
    else if (!hook.params.user.isEnabled) {
      // const name = _.get(hook, 'params.user.name') || _.get(hook, 'params.user.email') || 'This user';
      const name = hook.params.user.name || hook.params.user.email || 'user placeholder';
      throw new errors.Forbidden(`${name} is disabled.`);
    }
  };

};

module.exports = isEnabled;
