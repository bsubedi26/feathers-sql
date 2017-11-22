/**
 * PRIVATE SERVICES (USED INTERNALLY)
 * NOT EXPOSED TO PUBLIC ( VIA REST OR SOCKET )
*/
const email = require('./email');
const authManagement = require('./auth-management');

module.exports = function (app) {
  app.configure(email);
  app.configure(authManagement);
};
