module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'messages';

  db.schema.hasTable(table).then(exists => {
    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('text').notNullable();
        
        t.integer('user_id').unsigned().references('id').inTable('users')
        t.string('user_email').references('email').inTable('users').onDelete('cascade');
        t.timestamps(true, true)

      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e))
    }
  });

  return db;
};
