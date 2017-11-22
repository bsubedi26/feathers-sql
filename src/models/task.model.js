/* eslint-disable no-console */

// task-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'task';
  db.schema.hasTable(tableName).then(exists => {
    // if (exists) {
    //   db.schema.table('task', t => {
    //     t.dropColumn('another_col');
    //   })
    //   .then(() => console.log(`Dropped`))
    //   .catch(e => console.error(`Error Dropping ${tableName} table`, e));
    // }
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.string('text').notNullable();
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
