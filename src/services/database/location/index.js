// Initializes the `messages` service on path `/messages`
const createService = require('feathers-knex');
const createModel = require('../../../models/location.model');
const hooks = require('./hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  // const knex = app.get('knexClient');

  const options = {
    name: 'location',
    Model,
  };

  // Initialize our service with any options it requires
  app.use('/location', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('location');

  service.hooks(hooks);

  service.publish(() => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('authenticated');
  });
};
