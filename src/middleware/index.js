const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this;

  app.get('/testing', (req, res) => {

    const userService = app.service('users')

    userService.find({ query: 
      {
      email: 'fewf',
      $limit: 4
      } 
    })
    .then(allUsers => {
      res.json(allUsers)
    })
  })

  app.use(notFound());
  app.use(handler());
};
