const knex = require('knex');

module.exports = function (app) {
  const { client, connection, useNullAsDefault } = app.get('sqlite3');
  // const { client, connection } = app.get('postgres');
  // const { client, connection } = app.get('mysql');

  const db = knex({ client, connection, useNullAsDefault });
  // const db = knex({ client, connection });
  app.set('knexClient', db);
};
