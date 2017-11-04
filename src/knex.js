const knex = require('knex');

module.exports = function (app) {
  // const { client, connection } = app.get('sqlite3');
  // const { client, connection } = app.get('mysql');
  const { client, connection } = app.get('postgres');

  const db = knex({ client, connection });

  app.set('knexClient', db);
};
