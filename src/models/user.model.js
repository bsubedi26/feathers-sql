module.exports = function (app) {
  const knex = app.get('knexClient');
  const table = 'user';
  const schemaBuilder = require('knex/lib/schema/builder');
  const tableBuilder = require('knex/lib/schema/tablebuilder');

  schemaBuilder.prototype.addedThis = function() {
    console.log('addedThis works')
    return this;
  }

  tableBuilder.prototype.validateCol = function() {
    return this;
  }

  knex.schema.hasTable(table).then(exists => {
    // if (exists) {
    //   knex.schema.table(table, t => {
    //     // t.renameColumn('resetToken', 'verifyShortToken')
        
    //     t.json('verifyChanges');
    //   })
    //   .then(console.log('done'))
    // }

    if (!exists) {
      knex.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('email').unique().notNullable();
        t.string('password').notNullable();
        t.timestamps(true, true);

        t.boolean('isVerified');
        t.string('verifyToken');
        t.string('verifyShortToken');

        t.json('verifyChanges');
        t.string('verifyExpires');
      })
        .then(() => console.log(`Created ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return knex;
};


// if (exists) {
    //   knex.schema.table('user', t => {
    //     t.dropColumn('isDeleted');
    //     t.string('uniq_col').unique().notNullable();
    //   })
    //     .then(() => console.log(`Updated ${table} table`))
    //     .catch((e) => console.log(e));
    // }