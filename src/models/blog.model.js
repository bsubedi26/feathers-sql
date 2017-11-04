module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'blog';

  db.schema.hasTable(table).then(exists => {
    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('title').notNullable();
        t.string('body').notNullable();
        
        t.integer('u_id').unsigned().references('id').inTable('user');
        t.timestamps(true, true);

      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return db;
};
