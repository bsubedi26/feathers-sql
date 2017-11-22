const user = require('./user');
const task = require('./task');
const message = require('./message');

module.exports = function (app) {
  app.configure(user);
  app.configure(task);
  app.configure(message);
};
