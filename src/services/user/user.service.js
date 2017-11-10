// Initializes the `user` service on path `/user`
const createService = require('feathers-knex');
const createModel = require('../../models/user.model');
const hooks = require('./user.hooks');
const t = require('tcomb');
const validate = require('../validate');

const schema = t.struct({
  email: t.String,
  password: t.String
});

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const options = {
    name: 'user',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('user');

  validate(service, schema);

  service.hooks(hooks);

  app.publish(() => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('authenticated');
  });
};
