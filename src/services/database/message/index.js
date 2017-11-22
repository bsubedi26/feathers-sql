// Initializes the `messages` service on path `/messages`
const createService = require('feathers-knex');
const createModel = require('../../../models/message.model');
const hooks = require('./hooks');
const t = require('tcomb');
const validate = require('../../lib/validate');

const schema = t.struct({
  text: t.String
});

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'message',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/message', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('message');

  validate(service, schema);
  
  service.hooks(hooks);

  service.publish(() => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated', 'anonymous');
    // return app.channel('anonymous');
  });
};
