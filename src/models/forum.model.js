module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'forum';

  db.schema.hasTable(table).then(exists => {
    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('title').notNullable();
        t.string('summary').notNullable();
        t.string('topic').notNullable();
        t.integer('favorites').defaultTo(0);
        t.integer('opinions').defaultTo(0);
        
        t.integer('creator_id').unsigned().references('id').inTable('user');
        t.string('creator_email').references('email').inTable('user').onDelete('cascade');
        t.timestamps(true, true);

      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return db;
};
