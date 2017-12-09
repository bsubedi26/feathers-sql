const routesTable = require('./routes-table');

module.exports = function (app) {
  app.configure(routesTable);
};
