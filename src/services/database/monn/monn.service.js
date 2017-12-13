// Initializes the `monn` service on path `/monn`
const createService = require('feathers-mongoose');
const createModel = require('../../../models/monn.model');
const hooks = require('./monn.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'monn',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/monn', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('monn');

  service.hooks(hooks);
};
