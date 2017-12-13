module.exports = function (app) {

  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const timestamped = { timestamps: true };

  const user = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      exclude: true,
    },
    scope: {
      type: String,
      enum: ['Customer'],
      required: true,
      default: 'Customer'
    },

    isVerified: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String
    },
    verifyShortToken: {
      type: String
    },
    verifyExpires: {
      type: String
    },
    verifyChanges: {
      type: Object
    },

  }, timestamped);

  return mongooseClient.model('user', user);

};


//   const knex = app.get('knexClient');
//   const table = 'user';
//   const schemaBuilder = require('knex/lib/schema/builder');
//   const tableBuilder = require('knex/lib/schema/tablebuilder');

//   schemaBuilder.prototype.addedThis = function () {
//     console.log('addedThis works');
//     return this;
//   };

//   tableBuilder.prototype.validateCol = function () {
//     return this;
//   };

//   knex.schema.hasTable(table).then(exists => {
//     // if (exists) {
//     //   knex.schema.table(table, t => {

//     //     // t.dropColumn('password')
//     //     // t.renameColumn('resetToken', 'verifyShortToken')
        
//     //     // t.string('googleId');
//     //     // t.string('facebookId');
//     //     // t.string('githubId');
//     //     // t.json('github')

//     //     // t.json('verifyChanges');
//     //   })
//     //   .then(console.log('done'));
//     // }

//     if (!exists) {
//       knex.schema.createTable(table, t => {
//         t.increments('id').primary();
//         t.string('email').unique().notNullable();
//         t.string('password').notNullable();
//         t.timestamps(true, true);

//         t.boolean('isVerified');
//         t.string('verifyToken');
//         t.string('verifyShortToken');

//         t.json('verifyChanges');
//         t.string('verifyExpires');

//         // t.string('githubId');
//         // t.json('github');

//       })
//         .then(() => console.log(`Created ${table} table`))
//         .catch((e) => console.log(e));
//     }
//   });

//   return knex;
// };