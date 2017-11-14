// Initializes the `task` service on path `/task`
const createService = require('feathers-knex');
const createModel = require('../../models/task.model');
const hooks = require('./task.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'task',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/task', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('task');

  service.hooks(hooks);

  service.publish(() => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('authenticated');
    return app.channel('anonymous');
  });
};
