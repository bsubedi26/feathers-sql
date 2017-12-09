const errors = require('feathers-errors');
const t = require('tcomb-validation');

/*
 * USAGE: validate(service, type, {options})
 * Given a feathers service, a tcomb type and optional options for tcomb-validation,
 * will add a before hook to create, update, and patch methods to validate the incoming data.
 * On error, returns a feathers-errors BadRequest.
*/

module.exports = (service, type, options) => {
  const validateHook = createValidateHook_(type, options);

  service.hooks({
    before: {
      create: validateHook,
      update: validateHook,
      patch: function (hook, next) {
        // we want to validate the full object
        // so first get the current object
        // then apply the patch in memory
        // finally validate this full patched object
        service.get(hook.id, (err, data) => {
          if (err) { return next(err); }
          const vhookObject = Object.assign({}, hook, {
            data: Object.assign(data, hook.data)
          });
          validateHook(vhookObject, next);
        });
      }
    }
  });

};

const createValidateHook_ = (type, options) => {
  return function validateHook (hook, next) {
    const result = t.validate(hook.data, type, options);

    if (!result.isValid()) {
      const err = new Error('Invalid Request: Validation Error.');
      err.errors = result.errors;
      next(new errors.BadRequest(err, result.value));
    } else {
      next();
    }
  };
};
