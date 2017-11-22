const databaseServices = require('./database');
const privateServices = require('./private');
const libServices = require('./lib');

module.exports = function (app) {
  app.configure(databaseServices);
  app.configure(privateServices);
  app.configure(libServices);
};
