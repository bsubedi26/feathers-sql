const userLocal = require('./user/local');
const userOAuth = require('./user/oauth');
// const message = require('./message');

module.exports = function (app) {
  app.configure(userLocal);
  app.configure(userOAuth);
  // app.configure(message);
};
