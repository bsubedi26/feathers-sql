const userLocal = require('./user/local');
const userOAuth = require('./user/oauth');
const monn = require('./monn/monn.service.js');

module.exports = function (app) {
  app.configure(userLocal);
  app.configure(userOAuth);
  app.configure(monn);
};
