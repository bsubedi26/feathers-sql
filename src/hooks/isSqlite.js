const isSqlite = () => {
  return async ctx => {
    const knex = ctx.app.get('knexClient');
    // console.log('isSqlite? ', (knex.client.config.client === 'sqlite3') ? true : false);
    return (knex.client.config.client === 'sqlite3') ? true : false;
  };
};


module.exports = isSqlite;
