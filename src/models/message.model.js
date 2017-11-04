module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'message';

  db.schema.hasTable(table).then(exists => {
    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('text').notNullable();
        
        t.integer('user_id').unsigned().references('id').inTable('user');
        t.string('user_email').references('email').inTable('user').onDelete('cascade');
        t.timestamps(true, true);

      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return db;
};
