module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'location';

  db.schema.hasTable(table).then(exists => {
    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('comment');
        t.json('area');
        t.timestamps(true, true);
      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return db;
};
