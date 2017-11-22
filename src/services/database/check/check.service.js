// Initializes the `check` service on path `/check`
const createService = require('feathers-knex');
const createModel = require('../../models/check.model');
const hooks = require('./check.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'check',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/check', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('check');

  service.hooks(hooks);

  app.publish(() => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('authenticated');
  });
};
