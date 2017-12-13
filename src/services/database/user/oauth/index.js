// Initializes the `user` service on path `/user`
// const createService = require('feathers-knex');
// const createService = require('../../../lib/knex');
const createService = require('feathers-mongoose');
const createModel = require('../../../../models/oauth.model');
const hooks = require('./hooks');

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');
    const options = {
        name: 'oauth',
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/oauth', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('oauth');

    service.hooks(hooks);

    service.publish(() => {
        // Here you can add event publishers to channels set up in `channels.js`
        // To publish only for a specific event use `app.publish(eventname, () => {})`

        // e.g. to publish all service events to all authenticated users use
        return app.channel('authenticated', 'anonymous');
        // return app.channel('anonymous');
    });
};
