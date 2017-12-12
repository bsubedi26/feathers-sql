/* eslint-disable no-console */
module.exports = function (app) {
    const db = app.get('knexClient');
    const tableName = 'oauth';
    db.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            db.schema.createTable(tableName, t => {
                t.increments('id').primary();
                t.string('githubId');
                t.json('github');
            })
                .then(() => console.log(`Created ${tableName} table`))
                .catch(e => console.error(`Error creating ${tableName} table`, e));
        }
    });

    return db;
};
