module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'users';

  db.schema.hasTable(table).then(exists => {
    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary().notNullable()
        t.string('email').unique().notNullable()
        t.string('password').notNullable()
        t.boolean('isDeleted').defaultTo(false)
        t.timestamps(true, true)

        // t.specificType( 'roles', 'varchar(255)[]' ).notNullable();
      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e))
    }
  });

  return db;
};
