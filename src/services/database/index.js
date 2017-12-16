const userLocal = require('./user/local');
const userOAuth = require('./user/oauth');
const location = require('./location');
// const message = require('./message');

module.exports = function (app) {
  app.configure(userLocal);
  app.configure(userOAuth);
  app.configure(location);
  // app.configure(message);
};
