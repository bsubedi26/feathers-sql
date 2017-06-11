// Initializes the `tasks` service on path `/tasks`
const createService = require('feathers-mongoose');
const createModel = require('../../models/tasks.model');
const hooks = require('./tasks.hooks');
const filters = require('./tasks.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);

  const options = {
    name: 'tasks',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/tasks', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tasks');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
