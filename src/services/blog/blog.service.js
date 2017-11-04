// Initializes the `messages` service on path `/messages`
const createService = require('feathers-knex');
const createModel = require('../../models/blog.model');
const hooks = require('./blog.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');
  // const knex = app.get('knexClient');

  const options = {
    name: 'blog',
    Model,
    paginate
  };

  // app.get('/transaction/test', (req, res) => {
  //   knex.transaction(trans => {
  //     knex('users')
  //       .transacting(trans)
  //       .insert({ email: 'traax', password: 'bbbbb' })
  //       .then(rows => {
  //         knex('messages')
  //         .insert({ text: 'true' })
  //         .then(rows => {
  //           console.log('SUCCESSSSS!!', rows)
  //           trans.commit();
  //         })
  //       });
  //   })
  //   .catch(error => {
  //     console.log('ERRORRORORO!!', error)
  //     trans.rollback();
  //   })

  // })

  // Initialize our service with any options it requires
  app.use('/blog', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('blog');

  service.hooks(hooks);
  app.publish(() => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('authenticated');
  });
};
