// Initializes the `emails` service on path `/emails`
const createService = require('feathers-mongoose');
const createModel = require('../../models/emails.model');
const hooks = require('./emails.hooks');
const filters = require('./emails.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);

  const options = {
    name: 'emails',
    Model,
  };

  // Initialize our service with any options it requires
  app.use('/emails', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
